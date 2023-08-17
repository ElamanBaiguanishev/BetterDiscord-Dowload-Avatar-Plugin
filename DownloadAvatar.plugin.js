/**
 * @name DownloadAvatar
 * @description Добавляет кнопку для скачивания аватарки с десктопного дискорда
 * @author Oshava
 * @version 1.0.0
 * @authorLink https://vk.com/yelamani4
*/


module.exports = class DownloadAvatar {
    start() {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node instanceof Element && node.tagName === "DIV" && node.innerHTML.includes("userPopoutOuter")) {
                        const userTextElement = node.querySelector(".userText-1_v2Cq");

                        const name_user = node.querySelector(".userTagUsernameBase-267ALn");

                        const button = document.createElement("button");
                        button.style.backgroundColor = "#232428";
                        button.style.color = "white";
                        button.style.padding = "5px 5px";
                        button.textContent = "Download Avatar";

                        button.addEventListener("click", async () => {
                            const img = node.querySelector(".avatarStack-3Bjmsl img");
                            const high_res_img = img.src.replace(/size=100/, "size=4096");
                            const response = await fetch(high_res_img);
                            const blob = await response.blob();
                            const link = document.createElement("a");
                            link.href = URL.createObjectURL(blob);
                            link.download = `${name_user.textContent}.png`;
                            link.click();
                            URL.revokeObjectURL(link.href);
                        });

                        userTextElement.parentElement.insertBefore(button, userTextElement.nextSibling);
                    }
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
        this.observer = observer;
    }

    stop() {
        this.observer.disconnect();
    }
};