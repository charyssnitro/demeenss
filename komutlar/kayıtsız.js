const dc = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
 if(!['802964705752514561', '802964707736289320', '802964721691000832', '802964722398789692', '802964755245039666'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return
  
const kayıtlı = message.guild.roles.cache.find(r => r.id === '802964803928457296')
const vip = message.guild.roles.cache.find(r => r.id === '802964769131986964')
const kayıtsız = message.guild.roles.cache.find(r => r.id === '802964827789721600')
const kadın = message.guild.roles.cache.find(r => r.id === '802964801101758515')

const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.channel.send('**Bir Kullanıcı Belirt.**')
if(!member.roles.highest.position >= message.member.roles.highest.position) return
const x = message.guild.member(member)
let bilgi = db.get(`yetkili.${member.id}`);  
 
let tag = "☬ İsim | Yaş"
  
message.react('801801575840219136')   
x.setNickname(`${tag}`)
x.roles.remove(kayıtlı)
x.roles.remove(vip)  
x.roles.add(kayıtsız)
x.roles.remove(kadın)
x.setNickname(`${tag}`)
x.roles.remove(kayıtlı)
x.roles.remove(vip)  
x.roles.add(kayıtsız)
x.roles.remove(kadın)
  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["kayıtsız"],
    permLevel: 0
};

exports.help = {
    name: "kayıtsız"
}

