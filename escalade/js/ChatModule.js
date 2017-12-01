var App = App || {};
console.log('App in ChatModule :', App)

App.ChatModule = (function () {
    var messageSocket = null;
    var WEBSOCKET_URL_PROD = 'wss://d17chat.cleverapps.io/'
    var WEBSOCKET_URL_DEV = 'ws://localhost:8080'
    var username = localStorage.getItem("username")
    var messages = [];
    var historyMaxSize = 20;
    var start = function () {
        username = localStorage.getItem("username")
        initWebSocket()
        $('#messagerieModal').on('show.bs.modal', function (event) {
            scrollDownTheModal()
        })
    }
    var initWebSocket = function () {
        messageSocket = new WebSocket(WEBSOCKET_URL_PROD)
        messageSocket.onopen = function (event) {
            console.log('messageSocket open')
            $("#messageriebutton").prop("disabled", false)
            registerModalEvents()
        };

        messageSocket.onmessage = (msg) => {
            if (messages.length < historyMaxSize) {
                messages.push(getJsonMsg(msg.data))
            } else {
                sortMessages()
                // remove the oldest message 
                messages.pop()
                // add the new message
                messages.push(getJsonMsg(msg.data));
            }
            addMessagesToModal()
        };

        messageSocket.onclose = (msg) => {
            console.log('socket closed')
            if (localStorage.getItem("username") != "null") {
                initWebSocket()
            }
        };
    }

    var registerModalEvents = function () {
        var modal = $('#messagerieModal')
        msgSections = modal.find('#messages_section')
        msgSections.scrollTop(msgSections[0].scrollHeight)

        modal.find('#inputMessage').on("input propertychange", function (event) {
            ($(this).val() === "") ? modal.find("#sendMsg").prop("disabled", true) : modal.find("#sendMsg").prop("disabled", false);
        })
        modal.find('#sendMsg').on('click', function (event) {
            var msgStr = modal.find('#inputMessage').val()
            if (msgStr === "") { return }
            $("#inputMessage").val("");
            var msg = buildMsg(msgStr);
            console.log('envoi du message', msg)
            messageSocket.send(msg)
            modal.find('#inputMessage').val("")
        })
    }

    var addMessagesToModal = function (data) {
        /** on vide la zone */
        $('#messages_section').empty()
        $('#messagerieModalLabel small').text(messages.length + ' messages');

        /** on trie nos messages */
        sortMessages()
        /** puis on ajoute les messages au modal dans le bon ordre : */

        messages.forEach(msg => {
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', 'second': '2-digit' };
            var formattedDate = new Date(msg.date).toLocaleDateString('fr-FR', options)
            $('#messages_section').prepend(
                `<div class="list-group-item list-group-item-action flex-column align-items-start">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">`+ msg.name + `</h5>
                            <small>`+ formattedDate + `</small>
                        </div>
                    <p class="mb-1">`+ msg.message + `</p>
                    </div>`
            )
        })
        /** scroll to the bottom */
        scrollDownTheModal()
    }
    var sortMessages = function () {
        messages.sort((msg1, msg2) => {
            return new Date(msg2.date) - new Date(msg1.date)
        })
    }
    var scrollDownTheModal = function () {
        var wtf = $('#messages_section');
        var height = wtf[0].scrollHeight;
        wtf.scrollTop(height);
    }

    var buildMsg = function (body) {
        return JSON.stringify({ name: username, message: body })
    }
    var getJsonMsg = function (jsonstring) {
        return JSON.parse(jsonstring)
    }
    return { start }
})()
