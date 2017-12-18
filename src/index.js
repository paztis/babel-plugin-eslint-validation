const CACHE = {};

/**
 * Class representing an ESLintError.
 * @extends Error
 */
class ESLintError extends Error {}


const initOptions = (opts) => {
    const {
        fix = false,
        formatter = 'stylish',
        eslintPath = 'eslint',
        failOnError = true,
        failOnWarning = false
    } = opts;

    return {
        fix,
        formatter,
        eslintPath,
        failOnError,
        failOnWarning
    };
};

const getESLint = (options) => {
    return require(options.eslintPath);
};

const initCli = (options) => {
    const eslint = getESLint(options);
    return new eslint.CLIEngine({
        fix: options.fix
    });
};

const execLint = (cli, input, resourcePath) => {
    return cli.executeOnText(input, resourcePath, true);
};

const fixLint = (report, options) => {
    if (options.fix && report.results && report.results[0].output) {
        const eslint = getESLint(options);
        eslint.CLIEngine.outputFixes(report);
    }
};

const getFirstFailingMessage = (options, results, onlyErrors) => {
    if (onlyErrors) {
        const eslint = getESLint(options);
        results = eslint.CLIEngine.getErrorResults(results);
    }

    const [errorItem = {}] = results;
    const [message] = (errorItem.messages || []);

    return message;
};

const visitor = () => {
    return {
        visitor: {
            Program(path, state) {
                // ------------- Init cache ----------
                if (!CACHE.options) {
                    CACHE.options = initOptions(state.opts);
                }
                if (!CACHE.cli) {
                    CACHE.cli = initCli(CACHE.options);
                }

                const {file} = state;
                const {opts, code} = file;
                const {cli, options} = CACHE;

                const report = execLint(cli, code, opts.filename);
                const isFailingError = (options.failOnError && report.errorCount > 0);
                const isFailingWarning = (options.failOnWarning && report.warningCount > 0);

                // auto-fix the code
                fixLint(report, options);

                if (isFailingError || isFailingWarning) {
                    const formatter = cli.getFormatter(options.formatter);
                    const formattedMessage = formatter(report.results);

                    const failingMessage = getFirstFailingMessage(options, report.results, !isFailingWarning);

                    const error = path.buildCodeFrameError(formattedMessage, ESLintError);
                    if (failingMessage && error.loc && error.loc.line) {
                        // Update error location
                        error.loc.line = failingMessage.line;
                        error.loc.column = failingMessage.column;
                    }

                    throw error;
                }
            }
        }
    };
};


module.exports = visitor;
