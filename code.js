var embedAmount=document.querySelectorAll('.embed-amount') 
var usesAmount=document.getElementById('uses-amount').innerHTML 
//all 
var allDisplay=document.getElementById('used-by-banner') 
var usedByTools=document.querySelectorAll('.usedby-collection-item') 
var plusAmount=document.getElementById('plus-amount') 
var plusContainer=document.getElementById('plus-amount-container') 
//verified 
var verifedDis=document.getElementById('verified-header') 
var verifiedVis=document.querySelectorAll('.js-verified-item') 
var verifiedPlus=document.getElementById('verified-plus-amount') 
var verifiedPlusCont=document.getElementById('verified-plus-container') 
//same category 
var sameCategoryDis=document.getElementById('samecategory-header') 
var sameCategoryVis=document.querySelectorAll('.js-samecategory-item') 
var sameCategoryPlus=document.getElementById('samecategory-plus-amount') 
var sameCategoryPlusCont=document.getElementById('samecategory-plus-container') 

var totalUsers, totalVerified, totalSameCategory
var appStack=document.querySelectorAll('.js-app-stack').length

//totals and +X links
function setUsedBy(total, totalDisplay, visible, plusAmountLabel, plusContainerBlock, type) {
    totalUsers=document.getElementById('used-by-amount').innerHTML
    totalVerified=document.getElementById('verified-users-amount').innerHTML
    totalSameCategory=document.getElementById('samecategory-users-amount').innerHTML
    var parsedTotal, totalStr=total
    if(totalStr=='0' || totalStr=='100' || totalStr===undefined || totalStr===undefined && usesAmount=='0'){
            if(type=="all"){
                setTimeout(setUsedBy, 50, totalUsers, allDisplay, usedByTools, plusAmount, plusContainer, "all")
            } else if(type=="verified"){
                setTimeout(setUsedBy, 50, totalVerified, verifedDis, verifiedVis, verifiedPlus, verifiedPlusCont, "verified")
            } else if(type=="sameCategory"){
                setTimeout(setUsedBy, 50, totalSameCategory, sameCategoryDis, sameCategoryVis, sameCategoryPlus, sameCategoryPlusCont, "sameCategory")
            }
        return;
    } else {
        //parse to int
        console.log('totalStr is: ', totalStr)
        parsedTotal=parseInt(totalStr)
        console.log('parsedTotal is', parsedTotal)
        //set display total
        totalDisplay.innerText=parsedTotal
        //show +X
        if(parsedTotal > visible.length){
          if (plusContainerBlock != null){
            plusAmountLabel.innerText=parsedTotal - visible.length
            plusContainerBlock.style.display='flex';
          }
        }
    }
    if(type=="all"){
        mixpanel.track('Product page view', {
            'Used by amount': parsedTotal,
            'Uses amount': appStack,
            'Page name': document.title,
            'URL': window.location.pathname,
        });
        //dont show number in the embed link
        if(parsedTotal < 6){
            for (var i=0; i<embedAmount.length; i++){
            embedAmount[i].innerHTML=''
            }
        } else {
            //set # of users in embed link
            for (var i=0; i<embedAmount.length; i++){
            embedAmount[i].innerHTML=parsedTotal
            }
        }
        // show dummies for not logged in users
        var dummies = document.getElementsByClassName('locked-container')
        const maxDummies = 6
        if (parsedTotal>3){
          var dummiesAmount = parsedTotal - 3
          for (var i=0;i<dummiesAmount;i++){
            if (i<maxDummies && dummies.length > 0){
              dummies[i].style.display = "flex"
            }
            if (i==maxDummies && dummies.length > 0){
              document.getElementById('plus-container-guest').style.display = "flex"
              document.getElementById('plus-amount-guest').innerText = parsedTotal-8
            }
          }
        }
    }
}
setUsedBy(totalUsers, allDisplay, usedByTools, plusAmount, plusContainer, "all")
setUsedBy(totalVerified, verifedDis, verifiedVis, verifiedPlus, verifiedPlusCont, "verified")
setUsedBy(totalSameCategory, sameCategoryDis, sameCategoryVis, sameCategoryPlus, sameCategoryPlusCont, "sameCategory")
  
var eachOtherBlock = document.getElementById('js-eachOther-block')
function eachOther() {
    var users = document.querySelectorAll('.js-users-productname')
    if(users=='0' || users=='100' || users=='200'){
        setTimeout(eachOther, 100)
        return;
    } else {
        var appStack = document.querySelectorAll('.js-appstack-productname')
        var match = []

        for (var i=0; i<appStack.length; i++){
            for (var j=0; j<users.length; j++){
                if(appStack[i].innerHTML == users[j].innerHTML){
                    var clone = appStack[i].previousSibling.cloneNode(true)
                    clone.classList.remove("size-big");
                    clone.style.height = '64px'
                    match.push(clone)
                }
            }
        }
        var semiCircle=document.querySelectorAll('.js-matches')
        if(match[0]!==undefined){semiCircle[1].append(match[0])} else {
        	eachOtherBlock.style.display = "none"
        }
        if(match[1]!==undefined){semiCircle[2].append(match[1])}
        if(match[2]!==undefined){semiCircle[0].append(match[2])}
        if(match[3]!==undefined){semiCircle[5].append(match[3])}
        if(match[4]!==undefined){semiCircle[3].append(match[4])}
        if(match[5]!==undefined){semiCircle[6].append(match[5])}
        if(match[6]!==undefined){semiCircle[4].append(match[6])}
    }
}
eachOther()
  
//remove from website=1 products
var appsGrid=document.getElementById('usesToolsGrid')
for (var i=0; i<appsGrid.querySelectorAll('.w-condition-invisible').length; i++){
    var parent=appsGrid.querySelectorAll('.w-condition-invisible')[i].parentNode
    parent.remove()
}
//showing widget if ?embed
var url_string=window.location.href
var url=new URL(url_string);
var embed=url.searchParams.get("embed");
if(embed != ""){
	document.getElementById("content-wrapper").style.display="block"
    document.getElementById("full-width-header").style.display="block"
} else {
	document.getElementById("embed-widget").style.display="flex"
}
//hide embed if < 3
var copyButton=document.getElementById('copy-widget-code')
var embedLogoAmount=document.querySelectorAll('.js-embed-logo')
var sectionsToHide=document.querySelectorAll('.js-empty-state')
var emptyState=document.getElementById('js-tweet-invite')
if(embedLogoAmount.length < 3){
	for (var i=0; i<sectionsToHide.length; i++){
        sectionsToHide[i].style.display="none";
        copyButton.style.opacity="50%"
        copyButton.style.cursor="default"
        copyButton.setAttribute("disabled", '')
  }
  emptyState.style.display="flex"
}

//hide collections if 0
var appsGrid=document.querySelectorAll('.collection-apps-grid')
var collectionsSection=document.querySelectorAll('.in-collections-section')[0]
if(appsGrid.length==0){
	collectionsSection.style.display="none"
}

//copy code
var tip=document.getElementById('copied-tip')
copyButton.onclick=() => {
  if(embedLogoAmount.length > 2){
  	navigator.clipboard.writeText('<iframe src="https://www.companies.tools/p/' + slug + '?embed" width="100%" allowtransparency="true" frameBorder="0" scrolling="no"></iframe>');
    tip.style.display="block"
    mixpanel.track('Widget code copied', {
      'Page name': document.title,
      'URL': window.location.pathname,
    });
  }
}

//likes
var likeButton=document.getElementById('likeButton')
var likeButtonContainer=document.querySelectorAll('.like-button')[0]
function disable(){likeButton.disabled=true}
if(window.localStorage.getItem(itemID)=="true"){
	likeButton.disabled=true
  likeButtonContainer.style.backgroundImage="url(https://uploads-ssl.webflow.com/62016cc9f65de938902f2f84/6307c7a3b782308a9ef0b53a_heart-filled.svg)"
}
  likeButton.onclick=() => {
    likeButton.value=parseInt(likeButton.value) + 1
    likeButtonContainer.style.backgroundImage="url(https://uploads-ssl.webflow.com/62016cc9f65de938902f2f84/6307c7a3b782308a9ef0b53a_heart-filled.svg)"
    window.localStorage.setItem(itemID, true);
    mixpanel.track('Product liked', {
      'Page name': name
    });
    setTimeout(disable,400);
  }
  
//remove https
var prodLink=document.getElementById('productURL').innerHTML
 if(prodLink.indexOf('https://www.') > -1) {
  newURL=prodLink.replace('https://www.', '');
  document.getElementById('productURL').innerHTML=newURL
}  else if(prodLink.indexOf('https://') > -1) {
  newURL=prodLink.replace('https://', '');
  document.getElementById('productURL').innerHTML=newURL
} else if(prodLink.indexOf('http://www.') > -1) {
  newURL=prodLink.replace('http://www.', '');
  document.getElementById('productURL').innerHTML=newURL
} else if(prodLink.indexOf('http://') > -1) {
  newURL=prodLink.replace('http://', '');
  document.getElementById('productURL').innerHTML=newURL
}

//most popular categories
var allCats=document.querySelectorAll('.js-usedby-category');
var textCategories=[]
for (var i=0; i<allCats.length; i++){
	textCategories.push(allCats[i].textContent)
}
function mode(arr){
    return arr.sort((a,b) =>
          arr.filter(v => v===a).length
        - arr.filter(v => v===b).length
    ).pop();
}
document.getElementById('most-popular-category').textContent=mode(textCategories)

//set rank
var rankNames=document.querySelectorAll('.js-rank-productname')
var rankLabel=document.getElementById('rank-label')
for (var i=0; i<rankNames.length; i++){
	if(rankNames[i].textContent==name){
  	var rankNumber=parseInt([i]) + 1
  	rankLabel.textContent="#" + rankNumber
  }
}

//same category
var sameCat=document.querySelectorAll('.js-samecategory-item')
var sameCatBlock=document.getElementById('js-samecategory-block')
if(sameCat.length==0){
	sameCatBlock.style.display="none"
}

//verified teams block
var verified=document.querySelectorAll('.js-verified-item')
var verBlock=document.getElementById('js-verified-block')
if(verified.length==0){
	verBlock.style.display="none"
  sameCatBlock.style.gridColumnStart="span 2"
  sameCatBlock.style.gridColumnEnd="span 2"
}

//hide usage insights if 0
var usedCat=document.getElementById('js-used-cat')
if(document.querySelectorAll('.usedby-collection-item').length==0){
	verBlock.style.display="none"
  sameCatBlock.style.display="none"
  eachOtherBlock.style.display="none"
  usedCat.style.display="none"
}
