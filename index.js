var githubUsers = [
    { id: 'Melodie44', link: '??' },
    { id: 'AlexGeb', link: 'escalade' },
    { id: 'Kazekitai', link: 'randonnee' },
    { id: 'Tagpower', link: 'musique' },
    { id: 'thienban', link: 'football' },
    { id: 'AssiaTrabelsi', link: 'voyage' },
    { id: 'MAWAAW', link: 'poker' },
    { id: 'myR3po', link: '??' }];

$.get('partials/cardUser.html').then(function (templateCard) {
    Promise.all(
        githubUsers.map(function (user) {
            return $.get('https://api.github.com/users/' + user.id)
        })
    ).then(function (users) {
        var body = ''
        users.forEach(function (user) {
            var link = githubUsers.find(function (u) {
                return u.id == user.login
            }).link
            body += templateCard
                .replace('{{avatar_url}}', user.avatar_url)
                .replace('{{login}}', user.login)
                .replace('{{public_repos}}', user.public_repos)
                .replace('{{created_at}}', new Date(user.created_at).getFullYear())
                .replace('{{followers}}', user.followers)
                .replace('{{link}}', link)

        })
        document.querySelector('main').innerHTML = body
    })
})

