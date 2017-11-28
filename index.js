var githubUsers = ['Melodie44', 'AlexGeb', 'Tagpower', 'thienban', 'Kazekitai', 'AssiaTrabelsi', 'MAWAAW', 'myR3po'];

var templateCard = `
<div class="ui card">
    <div class="image">
    <img src="{{avatar_url}}">
    </div>
    <div class="content">
    <a class="header">{{login}}</a>
    <div class="meta">
        <span class="date">Compte créé le {{created_at}}</span>
    </div>
    <div class="description">
        Tu as {{public_repos}} dépôts publiques. 
    </div>
    </div>
    <div class="extra content">
    <a>
        <i class="user icon"></i>
        {{followers}} Amis
    </a>
    </div>
</div>


`
var body = ''

githubUsers.forEach(function(userId){
    $.get('https://api.github.com/users/'+userId, function(user){
        console.log(user)
        body+= templateCard
                    .replace('{{avatar_url}}', user.avatar_url)
                    .replace('{{login}}', user.login)
                    .replace('{{public_repos}}', user.public_repos)
                    .replace('{{created_at}}', user.created_at)                 
                    .replace('{{followers}}', user.followers)
        document.querySelector('main').innerHTML = body
    })
})

