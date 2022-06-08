$(document).ready(function(){
    function zero(num){
        if(num < 10){
            num = "0" + num;
        }
        return num;
    }
    var now = new Date();
    var nowdate = now.getTime();    // 5465464564
    var nowday  = now.getDay();     // 3
    var sun = nowdate - nowday*86400000; // 546451111
    sun = new Date(sun);
    sun = sun.getFullYear()+"-"+zero(sun.getMonth()+1)+"-"+zero(sun.getDate());
    function chk(num){
        $.ajax({
            crossOrigin: true,
            url:"http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustWeekFrcstDspth",
            data: {
                serviceKey:"CnKd2gwLWaX2UK1D09nvF4cchBggH6Q24BHCfH+uRyXZ0PCqcxeAzciv9vKEwONbVlOdC8TIzG7JfHsG/BqrQA==",
                searchDate: sun,
                returnType:"json"
            },
            type: "get", 
            headers: {},
            success: function(result){
                console.log(result);
                var txt = result.response.body.items[0].gwthcnd;
                var one = result.response.body.items[0].frcstOneCn;
                var two = result.response.body.items[0].frcstTwoCn;
                var three = result.response.body.items[0].frcstThreeCn;
                var four = result.response.body.items[0].frcstFourCn;
                var onedt = result.response.body.items[0].frcstOneDt;
                var twodt = result.response.body.items[0].frcstTwoDt;
                var threedt = result.response.body.items[0].frcstThreeDt;
                var fourdt = result.response.body.items[0].frcstFourDt;
                one = one.split(", ");
                two = two.split(", ");
                three = three.split(", ");
                four = four.split(", ");
                var cityName = one[num].split(" : ")[0];
                one = one[num].split(" : ")[1];
                two = two[num].split(" : ")[1];
                three = three[num].split(" : ")[1];
                four = four[num].split(" : ")[1];
                $("#onedt").text(onedt);
                if(one == "낮음"){
                    $("#today i").removeClass().addClass("fas").addClass("fa-smile");
                    $(".card").removeClass("dust").addClass("sunny");
                }else{
                    $("#today i").removeClass().addClass("fas").addClass("fa-angry");
                    $(".card").removeClass("sunny").addClass("dust");
                } 
                $("#location").text(cityName);
                $("#onecn").text(one);
                $("#note").text(txt);
                $("#two .dt").text(twodt);
                $("#three .dt").text(threedt);
                $("#four .dt").text(fourdt);
                $("#two .cn").text(two);
                $("#three .cn").text(three);
                $("#four .cn").text(four);
                if(two == "낮음"){
                    $("#two i").removeClass().addClass("fas").addClass("fa-smile");
                }else{
                    $("#two i").removeClass().addClass("fas").addClass("fa-angry");
                }
                if(three == "낮음"){
                    $("#three i").removeClass().addClass("fas").addClass("fa-smile");
                }else{
                    $("#three i").removeClass().addClass("fas").addClass("fa-angry");
                }
                if(four == "낮음"){
                    $("#four i").removeClass().addClass("fas").addClass("fa-smile");
                }else{
                    $("#four i").removeClass().addClass("fas").addClass("fa-angry");
                }
            }
        });
    }
    
    chk(0);
    $("#city").change(function(){
        var city = $(this).val();
        chk(city);
    });
    
});

