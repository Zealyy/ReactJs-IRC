import AuthService from "../services/auth.service";

const deleteChannel = async (name, Chat, socket) => {
    if (name === "" || name === " " || name === null) {
        Chat.setState({ error: "You have to specify a name for the channel you want to delete : \"/delete newChannel\"" });
    } else if (name === "Global Chat") {
        Chat.setState({ error: "You cannot delete the Global Chat" });
    } else {
        // DELETE CHANNEL
        await fetch("http://localhost:9000/api/channels/" + name, {
            method: 'DELETE',
        }).then(response => {
            if (response.status === 200) {
                socket.emit('SEND_MESSAGE', {
                    author: "System",
                    message: AuthService.getCurrentUser().username + " leaved the channel",
                    separator: " : ",
                    room: name
                })

                var roomId = Chat.props.parent.state.channels.get(name);

                socket.emit('QUIT_ROOM', {
                    id: roomId,
                    room: name
                })

                Chat.props.parent.state.channels.delete(name); 
                
                socket.emit('DELETE_ROOM', {
                    room: name
                })

                Chat.setState({ success: "The channel \"" + name + "\" has been successfully deleted" });
            } else if (response.status === 404) {
                Chat.setState({ error: "The channel \"" + name + "\" couldn't be found" });
            } else {
                Chat.setState({ error: "The channel \"" + name + "\" couldn't be deleted" });
            }
        });
    }
}

export default deleteChannel;
