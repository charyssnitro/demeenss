const Discord = require('discord.js')
const datab = require('quick.db')
const ms = require('ms')
const moment = require("moment");
const { parseZone } = require("moment");

exports.run =  async (client, message, args) => {
  
if(!['802964705752514561', '802964707736289320'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`)  

const kadın = message.guild.roles.cache.find(r => r.id === '802964801101758515')
const erkek = message.guild.roles.cache.find(r => r.id === '802964803928457296')
const kayıtsız = message.guild.roles.cache.find(r => r.id === '802964827789721600')
const vip = message.guild.roles.cache.find(r => r.id === '802964769131986964')
if(!kadın) return message.channel.send('1.ci Erkek rolü ayarlanmamış.')
if(!erkek) return message.channel.send('1.ci Erkek rolü ayarlanmamış.')
if(!kayıtsız) return message.channel.send('Kayıtsız rolü ayarlanmamış')




const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));

if(!member) return message.channel.send(`Bir kullanıcı belirt.`)
if(member.id === message.author.id) return message.channel.send('Kendini kayıt edemezsin.')
if(member.id === client.user.id) return message.channel.send('Botu kayıt edemezsin.')
if(member.id === message.guild.OwnerID) return message.channel.send('Sunucu sahibini kayıt edemezsin.')
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Bu kullanıcı sizden üst/aynı pozsiyondadır.`)
  
if(!args[0]) return message.channel.send('Bir kullanıcı belirt')  
let timereplace = args[0];
let time = timereplace.replace(/y/, ' yıl').replace(/d/, ' gün').replace(/s/, ' saniye').replace(/m/, ' dakika').replace(/h/, ' saat') 
 datab.add('case', 1)
 const sadxstg = await datab.fetch('case')
 var tarih = new Date(Date.now())
 var tarih2 = ms(timereplace)
 var tarih3 = Date.now() + tarih2 + 1296000000
 let ay = moment(Date.now()+1296000000).format("MM")
 let gün = moment(Date.now()+1296000000).format("DD")
 let saat = moment(Date.now()+1296000000).format("HH:mm:ss")
 let yıl = moment(Date.now()+1296000000).format("YYYY")
 let kayıtsaat = `\`${gün} ${ay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${saat} (${yıl})\``
 
let tag = '☬' 
let name = args[1]
let age = Number(args[2])
if(!name) return message.channel.send('Bir isim belirt.')
if(!age) return message.channel.send('Bir yaş belirt.')
  
datab.add(`yetkili.${message.author.id}.erkek`, 1)
datab.add(`yetkili.${message.author.id}.toplam`, 1)
let alldata = datab.fetch(`yetkili.${message.author.id}.toplam`)

const rol = "802964769131986964";
datab.set(`rol.${message.guild.id}`, rol)
let rol1 = datab.fetch(`rol.${message.guild.id}`)

message.react('800221911237394462')
member.setNickname(`${tag} ${name} | ${age}`)
member.setNickname(`${tag} ${name} | ${age}`)
member.roles.add(erkek)
member.roles.remove(kadın)
member.roles.add(vip)
member.roles.remove(kayıtsız)
member.roles.add(erkek)
member.roles.remove(kadın) 
member.roles.add(vip)
member.roles.remove(kayıtsız)  

  
const embed = new Discord.MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setDescription(`<a:gul2_altnglKopya:800221911237394462> • ${member} üyesi ${message.author} tarıfından ${vip} olarak kayıt edildi.`) 
.setColor("0x2f3136")
message.channel.send(embed).then(x => x.delete({timeout:7000}));
  
datab.push(`isim.${message.guild.id}`, {
  userID: member.id, 
  isim: name,
  yas: age,
  tag: tag
})

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['vip'],
    permLevel: 0
  }

  exports.help = {
    name: 'vipe',
    description: "Etiketlenen kişiyi erkek rolleriyle kayıt eder.",
    usage: '.vipe @etiket/id İsim Yaş'
  }
