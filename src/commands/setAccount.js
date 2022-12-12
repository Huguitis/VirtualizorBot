module.exports = [{
name: "setAccount",
code: `
$addButton[1;Continue;success;SetAccount_$authorID;no]
$color[1;YELLOW]
$description[1;$getVar[InfoEmoji] **__Set a Virtualizor account:__**
For this, you will need to authorize you with your Virtualizor api key and the Virtualizor api password created on your account api credentials settings.
Click on the "Continue" button to proceed.]
`
}, {
type: "interaction",
prototype: "button",
code: `
$interactionModal[Set Account;setAccountForm;
    {actionRow:
        {textInput:Virtualizor Domain (Without the last "/"):1:domainInput:yes:https#COLON#//vps.huguitisnodes.host#COLON#4083:3:100}
    }
    {actionRow:
        {textInput:Virtualizor Api Key:1:apikeyInput:yes:UHCPJCOXO7LRFVOS:10:30}
    }
    {actionRow:
        {textInput:Virtualizor Api Password:1:apipasswordInput:yes:YAhD2ZoUV8jqRphEuVQfDrx2qkslsWBS:10:50}
    }
]
    
$onlyIf[$advancedTextSplit[$interactionData[customId];_;2]==$interactionData[author.id];{"embeds" : "{newEmbed:{description:$getVar[ErrorEmoji] **You cannot use this button!**}{color:RED}}","ephemeral" : true,"options" : {"interaction" : true}}]
        
$onlyIf[$advancedTextSplit[$interactionData[customId];_;1]==SetAccount;]
`
}, {
type: "interaction",
name: "setAccountForm",
prototype: 'modal',
code: `
$interactionUpdate[;{newEmbed:{color:GREEN}{footer:Developed by Huguitis#4583 | Time Taken#COLON# $getObjectProperty[time_taken]ms}{description:
> ***__Logged In Successfully!__*** $getVar[SuccessEmoji]

$getVar[InfoEmoji] **__Account:__**
> **__Username:__** $getObjectProperty[username]
> **__Language:__** $getObjectProperty[preferences.language]
> **__Timezone:__** $getObjectProperty[preferences.timezone]
> **__First Name:__** $getObjectProperty[preferences.fname]
> **__Last Name:__** $getObjectProperty[preferences.lname]
> **__Company:__** $getObjectProperty[preferences.company]
> **__City:__** $getObjectProperty[preferences.city]
> **__Zip Code:__** $getObjectProperty[preferences.zip]
> **__Country:__** $getObjectProperty[preferences.country]

$getVar[InfoEmoji] **__Counts:__**
> **__Vps:__** $getObjectProperty[counts.vps]
> **__Users:__** $getObjectProperty[counts.users]
> **__SSH Keys:__** $getObjectProperty[counts.ssh_keys]
> **__Api Keys:__** $getObjectProperty[counts.api]
}}]

$setGlobalUserVar[VirtualizorPanelUrl;$textInputValue[domainInput]]
$setGlobalUserVar[VirtualizorApiKey;$textInputValue[apikeyInput]]
$setGlobalUserVar[VirtualizorApiPass;$textInputValue[apipasswordInput]]

$onlyIf[$getObjectProperty[uid]!=-1;{newEmbed:{color:RED}{description:$getVar[ErrorEmoji] **__Your api credentials are not valid.__ Please check your credentials and then execute again the command.**}}]

$createObject[$httpRequest[$textInputValue[domainInput]/index.php?api=json&apikey=$textInputValue[apikeyInput]&apipass=$textInputValue[apipasswordInput];GET]]
`
}]