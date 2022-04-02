/* Copyright (C) 2022 ameer-kallumthodi.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/
const fs = require('fs')
const Asena = require('../events');
const {MessageType, Mimetype } = require('@adiwajshing/baileys');
const FilterDb = require('./sql/filters');
const Config = require('../config')
const jid = Config.DISBGM != false ? Config.DISBGM.split(',') : [];
const Language = require('../language');
const Lang = Language.getString('filters');

if (Config.WORKTYPE == 'private') {

Asena.addCommand({pattern: 'filter ?(.*)', fromMe: true, desc: Lang.FILTER_DESC, dontAddCommandList: true}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);

    if (match === null) {
        filtreler = await FilterDb.getFilter(message.jid);
        if (filtreler === false) {
            await message.client.sendMessage(message.jid,Lang.NO_FILTER,MessageType.text)
        } else {
            var mesaj = Lang.FILTERS + '\n';
            filtreler.map((filter) => mesaj += '```' + filter.dataValues.pattern + '```\n');
            await message.client.sendMessage(message.jid,mesaj,MessageType.text);
        }
    } else {
        if (match.length < 2) {
            return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + ' ```.filter "sa" "as"',MessageType.text);
        }
        await FilterDb.setFilter(message.jid, match[0].replace(/['"“]+/g, ''), match[1].replace(/['"“]+/g, '').replace(/[#]+/g, '\n'), match[0][0] === "'" ? true : false);
        await message.client.sendMessage(message.jid,Lang.FILTERED.format(match[0].replace(/['"]+/g, '')),MessageType.text);
    }
}));
Asena.addCommand({pattern: 'stop ?(.*)', fromMe: true, desc: Lang.STOP_DESC, dontAddCommandList: true}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);
    if (match === null) {
        return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + '\n*Example:* ```.stop "hello"```',MessageType.text)
    }

    del = await FilterDb.deleteFilter(message.jid, match[0].replace(/['"“]+/g, ''));
    
    if (!del) {
        await message.client.sendMessage(message.jid,Lang.ALREADY_NO_FILTER, MessageType.text)
    } else {
        await message.client.sendMessage(message.jid,Lang.DELETED, MessageType.text)
    }
}));
Asena.addCommand({on: 'text', fromMe: false }, (async (message, match) => {
    if(Config.BGMFILTER){
        let banned = jid.find( Jid => Jid === message.jid);
        if(banned !== undefined) return
        if (!!message.mention && message.mention[0] == '919946432377@s.whatsapp.net') {
await message.client.sendMessage(message.jid, fs.readFileSync('./bgm/Mention.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted : message.data, ptt: true})
        }
const array = ['ayn','baby','Cr7','da','Dai','Di','Eda','Love u','messi','Mm','moodesh','music','muthe','My love','myr','Myre','Name entha','Name','Nanbaa','Nanbiye','neymar','Neymer','Nishal','Njan','njn','Njr','Oh no','Oh','ok da','ok','patti','Penn','pewer','photo','Pikachu','Pm','Poli','power','Rashmika','Rashu','sad','Sarasu','sed','Set','Sho','Single','sis','Sry','Subscribe','Suhail','umma','venda','Waiting','wcm','welcome','why','1','aara','Aarulle','adi','adima','Adipoli','alive','Aliya','Aliyo','alone','Althaf','Ameer','ano','ara','Araa','Ardra','ayilla','ayn','aysheri','Ayyo','baby','bad boy','Bad','Bgm','Bhasi','bie','big fan','Boss','bot','breakup','broken','brokenlove','Bye','care','Chathi','chatho','Chathy','Chetta','Chiri','Chunk','chunke','Chunks','Clg','comedy','cr7','Cristiano','Cry','da','Dai','dance','Di','die','don','Dora','Eda','Ee','Ellarum ede','enjoy','ennitt','enth','Entha cheyya','Entha','Enthada','Fan','Fasil','fd','Feel aayi','Fen','free','fresh','Frnd','funny','Gd mng','gd n8','Gd ngt','Gd','gdmng','good bye','group','Ha','Hbd','Hbday','He','Hello','help','Hi','Hlo','Hloo','Hoi','Hy','i am back','I love you','jd','kadhal','Kanapi','Kanjan','Kanjav','king','Kk','pikachu']
array.map( async (a) => {
let pattern = new RegExp(`\\b${a}\\b`, 'g');
if(pattern.test(message.message)){
       await message.client.sendMessage(message.jid, fs.readFileSync('./bgm/' + a + '.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted: message.data, ptt: true})
}
});
    }
    var filtreler = await FilterDb.getFilter(message.jid);
    if (!filtreler) return; 
    filtreler.map(
        async (filter) => {
            pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
            if (pattern.test(message.message)) {
                await message.client.sendMessage(message.jid,filter.dataValues.text, MessageType.text, {quoted: message.data});
            }
        }
    );
}));
}
else if (Config.WORKTYPE == 'public') {

Asena.addCommand({pattern: 'filter ?(.*)', fromMe: true, desc: Lang.FILTER_DESC, dontAddCommandList: true}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);

    if (match === null) {
        filtreler = await FilterDb.getFilter(message.jid);
        if (filtreler === false) {
            await message.client.sendMessage(message.jid,Lang.NO_FILTER,MessageType.text)
        } else {
            var mesaj = Lang.FILTERS + '\n';
            filtreler.map((filter) => mesaj += '```' + filter.dataValues.pattern + '```\n');
            await message.client.sendMessage(message.jid,mesaj,MessageType.text);
        }
    } else {
        if (match.length < 2) {
            return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + ' ```.filter "sa" "as"',MessageType.text);
        }
        await FilterDb.setFilter(message.jid, match[0].replace(/['"“]+/g, ''), match[1].replace(/['"“]+/g, '').replace(/[#]+/g, '\n'), match[0][0] === "'" ? true : false);
        await message.client.sendMessage(message.jid,Lang.FILTERED.format(match[0].replace(/['"]+/g, '')),MessageType.text);
    }
}));
Asena.addCommand({pattern: 'stop ?(.*)', fromMe: true, desc: Lang.STOP_DESC, dontAddCommandList: true}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);
    if (match === null) {
        return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + '\n*Example:* ```.stop "hello"```',MessageType.text)
    }

    del = await FilterDb.deleteFilter(message.jid, match[0].replace(/['"“]+/g, ''));
    
    if (!del) {
        await message.client.sendMessage(message.jid,Lang.ALREADY_NO_FILTER, MessageType.text)
    } else {
        await message.client.sendMessage(message.jid,Lang.DELETED, MessageType.text)
    }
}));
Asena.addCommand({on: 'text', fromMe: false}, (async (message, match) => {
        if(Config.BGMFILTER){
        let banned = jid.find( Jid => Jid === message.jid);
        if(banned !== undefined) return
        if (!!message.mention && message.mention[0] == '919946432377@s.whatsapp.net') {
await message.client.sendMessage(message.jid, fs.readFileSync('./bgm/Mention.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted : message.data, ptt: true})
        }
const array = ['ayn','baby','Cr7','da','Dai','Di','Eda','Love u','messi','Mm','moodesh','music','muthe','My love','myr','Myre','Name entha','Name','Nanbaa','Nanbiye','neymar','Neymer','Nishal','Njan','njn','Njr','Oh no','Oh','ok da','ok','patti','Penn','pewer','photo','Pikachu','Pm','Poli','power','Rashmika','Rashu','sad','Sarasu','sed','Set','Sho','Single','sis','Sry','Subscribe','Suhail','umma','venda','Waiting','wcm','welcome','why','1','aara','Aarulle','adi','adima','Adipoli','alive','Aliya','Aliyo','alone','Althaf','Ameer','ano','ara','Araa','Ardra','ayilla','ayn','aysheri','Ayyo','baby','bad boy','Bad','Bgm','Bhasi','bie','big fan','Boss','bot','breakup','broken','brokenlove','Bye','care','Chathi','chatho','Chathy','Chetta','Chiri','Chunk','chunke','Chunks','Clg','comedy','cr7','Cristiano','Cry','da','Dai','dance','Di','die','don','Dora','Eda','Ee','Ellarum ede','enjoy','ennitt','enth','Entha cheyya','Entha','Enthada','Fan','Fasil','fd','Feel aayi','Fen','free','fresh','Frnd','funny','Gd mng','gd n8','Gd ngt','Gd','gdmng','good bye','group','Ha','Hbd','Hbday','He','Hello','help','Hi','Hlo','Hloo','Hoi','Hy','i am back','I love you','jd','kadhal','Kanapi','Kanjan','Kanjav','king','Kk','pikachu' ]
array.map( async (a) => {
let pattern = new RegExp(`\\b${a}\\b`, 'g');
if(pattern.test(message.message)){
       await message.client.sendMessage(message.jid, fs.readFileSync('./bgm/' + a + '.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted: message.data, ptt: true})
}
});
    }

    var filtreler = await FilterDb.getFilter(message.jid);
    if (!filtreler) return; 
    filtreler.map(
        async (filter) => {
            pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
            if (pattern.test(message.message)) {
                await message.client.sendMessage(message.jid,filter.dataValues.text, MessageType.text, {quoted: message.data});
            }
        }
    );
}));
Asena.addCommand({on: 'text', fromMe: false}, (async (message, match) => {
    if(Config.AUTOSTICKER){
    let banned = jid.find( Jid => Jid === message.jid);
    if(banned !== undefined) return
    if (!!message.mention && message.mention[0] == '919946432377@s.whatsapp.net') {
await message.client.sendMessage(message.jid, fs.readFileSync('./sticker/song.webp'), MessageType.sticker, { mimetype: Mimetype.webp, quoted : message.data, ptt: false})
    }
const array = ['aara','Aarulle','aayo','achodaa','air','alla','anthas','ayin','Aysheri','Ayye','Ayyo','bie','Bomb','broken','bye','charge','chathu','chattho','cheyalle','chunk','committed','cute','Da','dead','eda','Eee','eh','engane und','Entha','Enthada','fan','girl','Girls','Good morning','Good night','Hi','Hlo','Hy','important','indo','ithokke enth','ivan','Julie','JulieMwol','killadi','kozhi','kunna','Kurippe','Kurumb','Like','Line','list','Love','madthu','mama','marichu','mention','Mm','mood','morning','Msd','muthe','myr','myre','naanam','nadakkatte','nee alle','night','njan','number','Ok','oombi','ooo','paavam','Pattumo','pedicho','pever','pidi','pikachu(1)','Pikachu','Pm','poda','Police','Poocha','Pova','powersh','powli','poyi','Rashmika','remove','sad','Save','saved','scene','Sed','setth','shaad','sheri','sho','Shoo','shut','Smile','song','Sry','tag','teach','test','thech','think','thund','Udayipp','uff','umma','uyir','Vaa','vada','Vannu','vibe','Vijay','yo','ys','z']
array.map( async (a) => {
let pattern = new RegExp(`\\b${a}\\b`, 'g');
if(pattern.test(message.message)){
   await message.client.sendMessage(message.jid, fs.readFileSync('./sticker/' + a + '.webp'), MessageType.sticker, { mimetype: Mimetype.webp, quoted: message.data, ptt: false})
}
});
}

var filtreler = await FilterDb.getFilter(message.jid);
if (!filtreler) return; 
filtreler.map(
    async (filter) => {
        pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
        if (pattern.test(message.message)) {
            await message.client.sendMessage(message.jid,filter.dataValues.text, MessageType.text, {quoted: message.data});
        }
    }
);
}));
}
