const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
//

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`${files.length} komut yüklenecek.`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`Yüklenen komut: ${props.help.name}.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});


client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//-----------------------GİRENE-ROL-VERME----------------------\\     STG

client.on("guildMemberAdd", member => {
  member.roles.add('802964827789721600'); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
});

//-----------------------GİRENE-ROL-VERME----------------------\\     STG

// --------------------- BOTU SES SOKMA ------------------------//
client.on("ready", async () => {
  let ch = client.channels.cache.find(r => r.id == "802965080877563934");
  ch.join()
    .then(connection => {
      console.log("Başarıyla Bağlandım!");
    })
    .catch(e => {
      console.error(e);
    });
});

//-----------------------İSİM-YAŞ----------------------\\     STG

client.on("guildMemberAdd", member => {
  member.setNickname("☬ İsim | Yaş");
});

//-----------------------HOŞ-GELDİN-MESAJI----------------------\\

client.on("guildMemberAdd", member => {  
  const kanal = member.guild.channels.cache.find(r => r.id === "802964996623302666");
    
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
  const gecen = moment.duration(kurulus).format(`YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
   
    var kontrol;
  if (kurulus < 1296000000) kontrol = `<a:hellheim_tac_2:805759990438166549> **WELCOME TO HELLHEIM** <a:hellheim_tac_2:805759990438166549> \n\n <a:HellHeim_unlem:803587397806850088> **Hoşgeldin, ${member} Seninle ${member.guild.memberCount} Kişiyiz!** <a:HellHeim_unlem:803587397806850088> \n\n <a:HellHeim_unlem:803587397806850088> **Yeni Açılmış Hesap Tespit edildi.**`
  if (kurulus > 1296000000) kontrol = `<a:hellheitac:805117543173718037> **WELCOME TO HELLHEIM** <a:hellheitac:805117543173718037> \n\n <a:hellheim_kalp_3:805117538752004116> **Hoşgeldin, ${member} Seninle ${member.guild.memberCount} Kişiyiz!** <a:hellheim_kalp_2:805117539087548447> \n\n <a:hellheim_kalp_3:805117538752004116> **Sunucuya Kayıt Olmak İçin Sol Taraftaki Voice Confirmed Odalarına Geçiş Yapabilirsin** <a:hellheim_kalp_2:805117539087548447> \n\n <a:hellheim_tik:805117543151960094> **Hesap Güvenli.** <a:hellheim_kalp_2:805117539087548447>`
  moment.locale("tr");
  kanal.send(`${kontrol}`)
  });
  
//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     

//------------------------------------------------------------------------------------------------------------------------------------\\

client.on("guildMemberAdd", member => {
    var moment = require("moment")
    require("moment-duration-format")
    moment.locale("tr")
     var {Permissions} = require('discord.js');
     var x = moment(member.user.createdAt).add(7, 'days').fromNow()
     var user = member.user
     x = x.replace("birkaç saniye önce", " ")
     if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
    const kytsz = member.guild.roles.cache.find(r => r.id === "KAYITSIZ ROL ID") 
     var rol = member.guild.roles.cache.get("ŞÜPHELİ ROL ID") // ŞÜPHELİ HESAP ROLÜNÜN İDSİNİ GİRİN
     var kayıtsız = member.guild.roles.cache.get(kytsz) // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
     member.roles.add(rol)
     member.roles.remove(kytsz)

  member.user.send('Selam Dostum Ne Yazık ki Sana Kötü Bir Haberim Var Hesabın 1 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Fake Hesap Katagorisine Giriyorsun Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır.')
  setTimeout(() => {
  
  }, 1000)
  
  
     }
          else {
  
          }
      });

//------------------------------------------------------------------------------------------------------------------------------------\\

//-----------------------TAG-ROL----------------------\\     STG

client.on("userUpdate", async (stg, yeni) => {
  var sunucu = client.guilds.cache.get('798691146481926184'); // Buraya Sunucu ID
  var uye = sunucu.members.cache.get(yeni.id);
  var tag = "☬"; // Buraya Ekip Tag
  var tagrol = "802964766590763018"; // Buraya Ekip Rolünün ID
  var logKanali = "802965005720092684"; // Loglanacağı Kanalın ID

  if (!sunucu.members.cache.has(yeni.id) || yeni.bot || stg.username === yeni.username) return;
  
  if ((yeni.username).includes(tag) && !uye.roles.cache.has(tagrol)) {
    try {
      await uye.roles.add(tagrol);
      await uye.send(`Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.`);
      await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`));
    } catch (err) { console.error(err) };
  };
  
  if (!(yeni.username).includes(tag) && uye.roles.cache.has(tagrol)) {
    try {
      await uye.roles.remove(uye.roles.cache.filter(rol => rol.position >= sunucu.roles.cache.get(tagrol).position));
      await uye.send(`Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${tag}**`);
      await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('RED').setDescription(`${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!`));
    } catch(err) { console.error(err) };
  };
});

//----------------------TAG-KONTROL----------------------\\     

client.on("guildMemberAdd", member => {
  let sunucuid = "798691146481926184"; //Buraya sunucunuzun IDsini yazın
  let tag = "☬"; //Buraya tagınızı yazın
  let rol = "802964766590763018"; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
if(member.user.username.includes(tag)){
member.roles.add(rol)
  const tagalma = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı.`)
      .setTimestamp()
     client.channels.cache.get('802965005720092684').send(tagalma)
}
})

//-----------------------TAG-KONTROL----------------------\\

//-----------------------YASAKLI-TAG-----------------------\\     STG

client.on("guildMemberAdd", member => {

if(member.user.username.includes("ˡᶤᵉ")){
member.roles.add("783989098535845898")
member.roles.remove("783997848035131422")
member.send("**__Sunucumuzun Yasaklı Tagında Bulunuyorsunuz, Şüpheli Kısmına Atıldınız.__**")
}
})

//-----------------------YASAKLI-TAG-----------------------\\     STG

 client.on("ready", async () => {
   log("Durum başarıyla ayarlandı")
      client.user.setActivity("☬ HellHeim Register (.) ❤️", 
        { url: 'https://twitch.tv/.',
        type: 'STREAMING' }); 
})
