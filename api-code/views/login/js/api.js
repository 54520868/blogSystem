$.ajaxPrefilter(function (options) {
    options.url = `http://localhost:7100${options.url}`
})