const CLIEngine = require("eslint").CLIEngine;


const visitor = () => {
     return {
         visitor: {
             Program(path, state) {
                 const fix = state.opts.fix;
                 if (state.filename) {
                     // Create ESLint instance
                     const cli = new CLIEngine({
                         fix: !!fix
                     });
                     const report = cli.executeOnFiles([state.filename]);

                     // auto-fix the code
                     if (fix && report.results && report.results[0].output) {
                         CLIEngine.outputFixes(report);
                     }

                     if (report.errorCount > 0) {
                         // hide result filepath to avoid pollute the error display
                         report.results.forEach(result => {
                             result.filePath = '';
                         });

                         const formatter = cli.getFormatter();
                         throw path.buildCodeFrameError(formatter(report.results));
                     }
                 }
             }
         }
     };
};


module.exports = visitor;
