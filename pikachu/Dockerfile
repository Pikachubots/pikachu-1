FROM fusuf/whatsasena:latest

RUN git clone https://github.com/ameer-kallumthodi/pikachu /root/WhatsAsenaDuplicated
WORKDIR /root/WhatsAsenaDuplicated/
ENV TZ=Europe/Istanbul
RUN npm install supervisor -g


CMD ["node", "bot.js"]
