var githubUsers = ['Melodie44', 'AlexGeb', 'Tagpower', 'thienban', 'Kazekitai', 'AssiaTrabelsi', 'MAWAAW', 'myR3po'];


$.get('partials/cardUser.html').then(function (templateCard) {
    Promise.all(
        githubUsers.map(function (userId) {
            return $.get('https://api.github.com/users/' + userId)
        })
    ).then(function (users) {
        var body = ''
        users.forEach(function (user) {
            console.log(user)
            body += templateCard
                .replace('{{avatar_url}}', user.avatar_url)
                .replace('{{login}}', user.login)
                .replace('{{public_repos}}', user.public_repos)
                .replace('{{created_at}}', new Date(user.created_at).getFullYear())
                .replace('{{followers}}', user.followers)

        })
        document.querySelector('main').innerHTML = body
    })
})

