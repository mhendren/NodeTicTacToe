module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.initConfig({
        mochaTest: {
            test: {
                options: {
                    reporter: "spec",
                    captureFile: "results.txt",
                    quiet: false
                },
                src: ["test/**/*.js"]
            }
        }
    });

    grunt.registerTask("default", "mochaTest");
};