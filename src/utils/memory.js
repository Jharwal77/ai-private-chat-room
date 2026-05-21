export const saveChat = (messages) => {
  localStorage.setItem("rahul-sanjana-chat", JSON.stringify(messages));
};

export const loadChat = () => {
  const data = localStorage.getItem("rahul-sanjana-chat");
  return data ? JSON.parse(data) : [];
};