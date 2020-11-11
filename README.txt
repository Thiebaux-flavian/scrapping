# A guide about Scrapping

#### Before start to talk about how this work, lets talk why : 

I made this script for an toulouse association trying to help younger worker, refugees and people in needed.

They used to organize events and for this they need to search collaboraters or workers fast.
For all they doing for our society, i decide to help them at my scale

this script will help them to collect data from Pole-emploi and propose work to candidate who needs work.
Scrapping is legal in france no worries about that.


### Let's setup now : 

⋅⋅* JavaScript : 

in main.js you will need to change this variable with your own Google_sheet Url :

```javascript
10 let url = '#YOUR_SHEET_URL';
```
To get your Url, you have to create your Google-sheet, tools => edit script => publish = deploy as web application
Select Anyone, even anonymous for "Who has access to the app:"

⋅⋅* Google-sheet :

When you are in editing script copy/paste 'code.gs' file, save and click on Execute => execute fonction => setup. 
You can change:

```javascript
5    var SHEET_NAME = "ENTER_YOUR_OWN_SHEET_NAME";
```

BE SURE to have the same name than the name on your bottom sheet ! 


To get data you have to set 2 cellule no matter where, they have just to have "mail" and "tel" inside.
for myself i use:
B1 => mail
D1 => tel  


⋅⋅* Chrome :

Run in your extension panel, select "developeur mode" and "load extension unpackage".
Select "Module" files and it's done ! 
you litteraly finish.



⋅⋅* Check if working :

Go on Pole-emploi, log as recruteur
search what and where and when the research is done and you are able to see all candidates.
Click on the module and the 'scrapping' button. 

check the console and your google sheet to see data stocking.
