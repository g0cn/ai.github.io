import { h, render, PureComponent } from 'preact';

// 聊天记录列表组件
const ChatList = ({ chats }) => {
return (
<div class="weui-cell">
<div class="weui-cell__bd">
{chats.map(chat => (
<div class="weui-cell__bd">{chat.content}</div>
))}
</div>
</div>
);
};

// 聊天输入框组件
const ChatInput = ({ onSend }) => {
let inputRef = null;
const handleSend = () => {
const content = inputRef.value.trim();
if (content) {
onSend(content);
inputRef.value = '';
}
};

return (
	<div class="weui-cell">
		<div class="weui-cell__bd">
			<input class="weui-input" type="text" placeholder="请输入聊天内容" ref={el => (inputRef = el)} />
		</div>
		<div class="weui-cell__ft">
			<button class="weui-btn weui-btn_primary" onClick={handleSend}>发送</button>
		</div>
	</div>
);
};

// 聊天界面组件
class Chat extends PureComponent {
state = {
chats: []
};

handleSend = content => {
	const { chats } = this.state;
	const newChats = [...chats, { content, timestamp: new Date().getTime() }];
	this.setState({ chats: newChats });
};

render() {
	const { chats } = this.state;
	return (
		<div>
			<ChatList chats={chats} />
			<ChatInput onSend={this.handleSend} />
		</div>
	);
}
}

render(<Chat />,
document.getElementById('chatList'));