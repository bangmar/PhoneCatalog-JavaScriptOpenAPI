// on load page
fetch("https://api-mobilespecs.azharimm.site/v2/brands/acer-phones-59").then(
    function(response){
        // cek apakah ada error page
        if(response.status != 200){
            console.warn(`opps error ${response.status}`)
        }

        // jika tidak
        response.json().then(function(data){
            const phoneDatas = data.data.phones
            let colCount = 0;
            phoneDatas.forEach(phoneData => {
                document.getElementById('phoneList').insertAdjacentHTML('beforeend', 
                `<li class=nameList>
                <button type="button" class="collapsible" onclick = "showDetail(this)">${phoneData.phone_name}</button></li>`)
                
                window.onload = phoneDetail(colCount, phoneData.detail)                
                colCount++
            })
            
        })
    }
)


function phoneDetail(colCount, url){
    
    fetch(url).then(function(response){
        response.json().then(function(dataDetail){
            

            // cek harga
            try{
                isPriceKnown = dataDetail.data.specifications[12].specs[1].val[0]
                
                if(!isPriceKnown.includes("About")){
                    isPriceKnown = 'sory we dont know'
                }
            }catch(err){
                if(err){
                    isPriceKnown = 'sory we dont know'
                }
            }

            // cek apakkah daata cpu ada
            try{
                isCPUKnown = dataDetail.data.specifications[4].specs[2].val[0]

            }catch(err){
                if(err){
                    isCPUKnown = 'sory we dont know'
                }
            }

            document.getElementsByClassName('nameList')[colCount].insertAdjacentHTML('beforeend', 
            `<div class = "content">
                <section>
                <div class = 'phoneImage'>
                    <img src=${dataDetail.data.phone_images[0]} class = 'imgCatalog'>
                </div>
                <div class = phoneDetail>
                    <p class='release-date'>${dataDetail.data.release_date}</p>
                    <p>Storage       : ${dataDetail.data.storage}</p>
                    <p>CPU           : ${isCPUKnown}</p>
                    <p>Kisaran Harga : ${isPriceKnown}</p>
                </div>
                </section>
            </div>`)
            
        })
    })

}

function showDetail(el){
    el.classList.toggle("active");
    let content = el.nextElementSibling;
    if (content.style.maxHeight){
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }

    
}


