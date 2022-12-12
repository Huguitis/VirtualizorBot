module.exports = [{
name: "manageVps",
code: `
$addButton[1;Stop VPS;danger;StopVPS_$authorID_$message[1];$if[$getObjectProperty[info.status]==0;yes;no]]
$addButton[1;Start VPS;success;StartVPS_$authorID_$message[1];$if[$getObjectProperty[info.status]==1;yes;no]]

$footer[1;Developed by Huguitis#4583 | Time Taken: $getObjectProperty[time_taken]ms]
$color[1;$if[$getObjectProperty[info.status]==1;GREEN;RED]]

$description[1;
**__VPS Info:__**
> **__Status:__** $if[$getObjectProperty[info.status]==1;Online :green_circle:;Offline :red_circle:]
> **__Hostname:__** $getObjectProperty[info.vps.hostname]
> **__VPS ID:__** $getObjectProperty[info.vps.vpsid]
> **__VPS Name:__** $getObjectProperty[info.vps.vps_name]
> **__Virtualization:__** $getObjectProperty[info.vps.virt]
> **__IP Count:__** $getObjectProperty[info.ip_count]
> **__Suspended:__** $if[$getObjectProperty[info.vpd.suspended]==1;Yes.;No.]

**__Resources:__**
> **__Bandwidth:__** $getObjectProperty[info.vps.bandwidth]
> **__Network Speed:__** $getObjectProperty[info.vps.network_speed]
> **__Upload Speed:__** $getObjectProperty[info.vps.upload_speed]
> **__IO:__** $getObjectProperty[info.vps.io]
> **__Ram:__** $getObjectProperty[info.vps.ram]
> **__Swap:__** $getObjectProperty[info.vps.swap]
> **__Cpu Usage:__** $getObjectProperty[info.vps.cpu_percent]%

**__OS:__**
> **__OS ID:__** $getObjectProperty[info.vps.osid]
> **__Name:__** $getObjectProperty[info.vps.os_name]
> **__Distribution:__** $getObjectProperty[info.os.distro]]

$onlyIf[$message[1]!=;{newEmbed:{color:RED}{description:$getVar[ErrorEmoji] **__You need to specify your vps id.__ Example: $getVar[BotPrefix]manageVps 4**}}]

$onlyIf[$getObjectProperty[uid]!=-1;{newEmbed:{color:RED}{description:$getVar[ErrorEmoji] **__Your api credentials are not longer valid.__ Please re-configure them with $getVar[BotPrefix]setAccount**}}]

$onlyIf[$getGlobalUserVar[VirtualizorPanelUrl]!=None;{newEmbed:{color:RED}{description:$getVar[ErrorEmoji] **__Your need to configure your virtualizor account first.__ Please do it with $getVar[BotPrefix]setAccount**}}]

$createObject[$httpRequest[$getGlobalUserVar[VirtualizorPanelUrl]/index.php?api=json&act=vpsmanage&svs=$message[1]&apikey=$getGlobalUserVar[VirtualizorApiKey]&apipass=$getGlobalUserVar[VirtualizorApiPass];POST]]
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionUpdate[;{newEmbed:{footer:Developed by Huguitis#4583 | Time Taken#COLON# $getObjectProperty[time_taken]ms}{color:GREEN}{description:
> ***__VPS started successfully!__*** $getVar[SuccessEmoji]
    
**__Info:__**
> **VPS Status:** Online :green_circle:
> **VPS ID:** $getObjectProperty[vpsid]
> **UID:** $getObjectProperty[uid]
}};
{actionRow:{button:Start VPS:success:StartVPS_$authorID_$advancedTextSplit[$interactionData[customId];_;3]:yes}{button:Stop VPS:danger:StopVPS_$authorID_$advancedTextSplit[$interactionData[customId];_;3]:no}}]

$createObject[$httpRequest[$getGlobalUserVar[VirtualizorPanelUrl]/index.php?svs=$advancedTextSplit[$interactionData[customId];_;3]&act=start&api=json&apikey=$getGlobalUserVar[VirtualizorApiKey]&apipass=$getGlobalUserVar[VirtualizorApiPass]&do=1;POST]]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You cannot use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
        
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==StartVPS;]
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionUpdate[;{newEmbed:{footer:Developed by Huguitis#4583 | Time Taken#COLON# $getObjectProperty[time_taken]ms}{color:GREEN}{description:
> ***__VPS stopped successfully!__*** $getVar[SuccessEmoji]
    
**__Info:__**
> **VPS Status:** Offline :red_circle:
> **VPS ID:** $getObjectProperty[vpsid]
> **UID:** $getObjectProperty[uid]
}};
{actionRow:{button:Start VPS:success:StartVPS_$authorID_$advancedTextSplit[$interactionData[customId];_;3]:no}{button:Stop VPS:danger:StopVPS_$authorID_$advancedTextSplit[$interactionData[customId];_;3]:yes}}]

$createObject[$httpRequest[$getGlobalUserVar[VirtualizorPanelUrl]/index.php?svs=$advancedTextSplit[$interactionData[customId];_;3]&act=stop&api=json&apikey=$getGlobalUserVar[VirtualizorApiKey]&apipass=$getGlobalUserVar[VirtualizorApiPass]&do=1;POST]]

$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You cannot use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
        
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==StopVPS;]
`
}]