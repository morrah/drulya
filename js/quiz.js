(function(){
    "use strict";

    var makeCRCTable = function(){
        var c;
        var crcTable = [];
        for(var n =0; n < 256; n++){
            c = n;
            for(var k =0; k < 8; k++){
                c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
            }
            crcTable[n] = c;
        }
        return crcTable;
    };
    var crc32 = function(str) {
        var crcTable = window.crcTable || (window.crcTable = makeCRCTable());
        var crc = 0 ^ (-1);
    
        for (var i = 0; i < str.length; i++ ) {
            crc = (crc >>> 8) ^ crcTable[(crc ^ str.charCodeAt(i)) & 0xFF];
        }
    
        return (crc ^ (-1)) >>> 0;
    };
    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
    };

    function RadioHandler(quiz) {
        return function() {
            var results = quiz.serialize();
            localStorage.setItem("state", results);
            Array.prototype.forEach.call(quiz.obj.querySelectorAll(".error-message"), function(node) {
                node.classList.add("hidden");
            });
        }
    }

    function SubmitHandler(quiz) {
        return function() {
            var results = quiz.serialize();
            var congrats = "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";
            var decrypted = "";
            try {
                decrypted = CryptoJS.AES.decrypt(congrats, crc32(results).toString()).toString(CryptoJS.enc.Utf8);
                decrypted = JSON.parse(decrypted);
            }
            catch(e) {
                console.log(e);
            }
            if (decrypted && decrypted.data) {
                document.body.innerHTML = "";
                eval(decrypted.data);
            } else {
                Array.prototype.forEach.call(quiz.obj.querySelectorAll(".error-message"), function(node) {
                    node.classList.remove("hidden");
                    window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
                });
            }
        };
    }
    
    function Quiz(obj, template_quiz, template_question, template_answer) {
        this.title = "";
        this.questions = [];
        this.obj = obj;
        this.template_quiz = template_quiz;
        this.template_question = template_question;
        this.template_answer = template_answer;
        this.innerHTML = "";
        this.submit = new SubmitHandler(this);
        this.radioclick = new RadioHandler(this);
    }
    Quiz.prototype.setTitle = function(data) {
        this.title = data;
    };
    Quiz.prototype.addQuestion = function(text, answers) {
        var answers_html = "";
        for (var i=0; i<answers.length; i++) {
            var answer = this.template_answer
                .replaceAll("$(name)", "q"+crc32(text))
                .replaceAll("$(val)", i.toString())
                .replaceAll("$(answer)", answers[i]);
            answers_html = answers_html + answer;
        }
        var question_html = this.template_question
            .replaceAll("$(question)", text)
            .replaceAll("$(answers)", answers_html);
        this.questions.push(question_html);
    };
    Quiz.prototype.update = function() {
        var questions_html = "";
        for (var i=0; i<this.questions.length; i++) {
            questions_html = questions_html + this.questions[i];
        }
        this.obj.innerHTML = this.template_quiz
            .replaceAll("$(title)", this.title)
            .replaceAll("$(questions)", questions_html);
        this.obj.querySelector(".quiz-submit").onclick = this.submit;
        var that = this;
        Array.prototype.forEach.call(this.obj.querySelectorAll("input[type=radio]"), function(node) {
            node.onclick = that.radioclick;
        });
    };
    Quiz.prototype.serialize = function() {
        return Array.prototype.map.call(this.obj.querySelectorAll(".question-option input"), function(obj){
            return obj.name + ":" + obj.value + ":" + obj.checked;
        }).join("&");
    };
    Quiz.prototype.deserialize = function(state) {
        var that = this;
        state.split("&").map(function(obj){ 
            return obj.split(":"); 
        }).map(function(inp){
            if (inp[2] == "false") {
                return;
            }
            var idx = parseInt(inp[1]);
            var input = that.obj.querySelectorAll("input[name='" + inp[0] + "']")[idx];
            if (input) {
                input.checked = true;
            }
        });
    };
    
    var drulya = document.getElementById("drulya");
    var template_quiz = document.querySelector(".template-quiz").innerHTML;
    var template_question = document.querySelector(".template-question").innerHTML;
    var template_answer = document.querySelector(".template-answer").innerHTML;

    var drulya_quiz = new Quiz(drulya, template_quiz, template_question, template_answer);
    var quiz = 
    {
        "title": "Уля, с днюлей!",
        "data": [
            {
                "question": "Ульчуля избегает как диксит, так и имаджинариум.",
                "answers": [
                    "ульчуля не избегает диксит;",
                    "ульчуля избегает имаджинариум;",
                    "ульчуля избегает имаджинариум больше, чем диксит, но и диксит избегает тоже."
                ]
            },
            {
                "question": "Если блевулю накормить грибами, то она сразу начнет пускать пузыри.",
                "answers": [
                    "если блевуля пускает пузыри, то она была накормлена грибами;",
                    "если блевулю не накормить грибами, то она не будет пускать пузыри;",
                    "если блевуля не пускает пузыри, то она не накормлена грибами."
                ]
            },
            {
                "question": "Все читерули умеют подглядывать в чужие карты.",
                "answers": [
                    "не бывает читеруль, которые не умеют подглядывать в чужие карты;",
                    "все, кто умеет подглядывать в чужие карты, являются читерулями;",
                    "не бывает читеруль, которые умеют подглядывать в чужие карты."
                ]
            },  
            {
                "question": "Соснули бывают либо сонными, либо бодрыми. Неправда, что эта соснуля не бодрая.",
                "answers": [
                    "эта соснуля сонная;",
                    "эта соснуля средненькая;",
                    "эта соснуля бодрая."
                ]
            },
            {
                "question": "В природе обнаружено более десятка козуль. Все обнаруженные козули сплошь красного цвета.",
                "answers": [
                    "по крайней мере некоторые из козуль красного цвета;",
                    "по крайней мере некоторые из козуль зеленые;",
                    "некоторые козули (из тех, что уже обнаружены) могут оказаться не красными."
                ]
            },
            {
                "question": "Существуют косули с больной мухропендией.",
                "answers": [
                    "не всякая косуля может похвастаться здоровой мухропендией;",
                    "не всякая косуля может похвастаться больной мухропендией;",
                    "существуют косули со здоровой мухропендией."
                ]
            },
            {
                "question": "Известно, что загогуля обязательно или длиннонога, или длиннорука, или то и другое вместе.",
                "answers": [
                    "загогуля не может быть короткорукой;",
                    "загогуля не может быть коротконогой и короткорукой одновременно;",
                    "загогуля не может быть длинноногой и короткорукой одновременно."
                ]
            },
            {
                "question": "Неправда, что наша ульчатница большая и круглая.",
                "answers": [
                    "наша ульчатница маленькая и некруглая;",
                    "наша ульчатница маленькая, или некруглая, или то и другое вместе;",
                    "наша ульчатница маленькая, или некруглая, но не то и другое вместе."
                ]
            },
            {
                "question": "Уля всегда либо читерит, либо подглядывает.",
                "answers": [
                    "Уля иногда читерит;",
                    "Уля иногда читерит, а иногда подглядывает;",
                    "Уля никогда не занимается одновременно и читерством, и подглядыванием."
                ]
            },
            {
                "question": "Журналисты наврали, что кулябяка беспринципна и нахальна.",
                "answers": [
                    "на самом деле кулябяка принципиальна и тактична;",
                    "на самом деле кулябяка беспринципна, но не нахальна;",
                    "те журналисты солгали."
                ]
            },
            {
                "question": "Если тряхнуть бурдулькой, то начнется стрельба. Бурдулькой тряхнули.",
                "answers": [
                    "стрельба уже началась;",
                    "стрельба начнется когда-нибудь;",
                    "стрельба начнется когда-нибудь или уже началась."
                ]
            },
            {
                "question": "Если тряхнуть перпулькой, то немедленно начнется стрельба. За последний час стрельбы не было.",
                "answers": [
                    "в течение последнего часа перпулькой не трясли;",
                    "в течение последнего часа перпулькой трясли;",
                    "а нечего было трясти чем попало."
                ]
            },
            {
                "question": "Душевые червули напугали туристулю.",
                "answers": [
                    "туристуле приснился ночной кошмар;",
                    "туристуля попробовала некачественной выпивки;",
                    "туристуля была напугана."
                ]
            },
            {
                "question": "Если отнимать у кощули золото, она начнет недовольно шипеть. Если кощуля недовольно зашипит, то молоко поблизости скиснет.",
                "answers": [
                    "если не отнимать у кощули золото, то молоко поблизости не скиснет;",
                    "если отнимать у кощули золото, молоко поблизости скиснет;",
                    "молоко вдалеке никогда не скисает от отнимания золота у кощуль."
                ]
            },
            {
                "question": "Всех, кто громко улюлюкает, обязательно съедают. Все ревули постоянно громко улюлюкают.",
                "answers": [
                    "все, кто громко улюлюкает,- ревули;",
                    "всех ревуль обязательно съедают;",
                    "некоторых ревуль не съедают."
                ]
            },
            {
                "question": "Алкогуля прихлопывает и мух, и коктейли.",
                "answers": [
                    "алкогуля не трогает мух;",
                    "алкогуля прихлопывает коктейли;",
                    "алкогуля прихлопывает только мух и коктейли."
                ]
            },
            {
                "question": "Все барабули радуют ответственностью или трудолюбием, а иногда даже и тем, и другим.",
                "answers": [
                    "барабуля не может быть безответственной;",
                    "не бывает безответственных ленивых барабуль;",
                    "не бывает ответственных трудолюбивых барабуль."
                ]
            },
            {
                "question": "Когда храпуля спит, она всегда мухряет.",
                "answers": [
                    "если храпуля мухряет, значит, она спит;",
                    "если храпуля не спит, она не мухряет;",
                    "если храпуля не мухряет, значит, она не спит."
                ]
            },
            {
                "question": "Все террорули любят мультитулы.",
                "answers": [
                    "не бывает терроруль, которые не любят мультитулы;",
                    "все, кто любит мультитулы, - террорули;",
                    "не бывает терроруль, которые любят мультитулы."
                ]
            },
            {
                "question": "Есть только два вида пеструль: красные и синие. Что касается этой конкретной пеструли, то она оказалась вовсе не синей.",
                "answers": [
                    "эта пеструля синяя;",
                    "эта пеструля синекрасная;",
                    "эта пеструля красная."
                ]
            },
            {
                "question": "Во время дозоров ночнули раскопали множество грязных секретов. Но все они очень плохо сохранились.",
                "answers": [
                    "некоторые грязные секреты очень плохо сохранились;",
                    "по крайней мере некоторые грязные секреты в отличном состоянии;",
                    "некоторые раскопанные грязные секреты сохранились хорошо."
                ]
            },
            {
                "question": "Некоторые опоздули не стоят на переезде.",
                "answers": [
                    "не всякая опоздуля не стоит на переезде;",
                    "существуют стоящие на переезде опоздули;",
                    "не всякая опоздуля стоит на переезде."
                ]
            },
            {
                "question": "Говорили, что лапули и дерзкие, и резкие. Оказывается, это вовсе не так.",
                "answers": [
                    "на самом деле лапули робкие и плавные;",
                    "на самом деле лапули робкие или плавные или то и другое сразу;",
                    "на самом деле лапули робкие или плавные, но не то и другое сразу."
                ]
            },
            {
                "question": "Трещуля всегда либо говорит, либо слушает.",
                "answers": [
                    "Трещуля слушает говоря;",
                    "Трещуля не слушает молча;",
                    "Трещуля не слушает говоря."
                ]
            },
            {
                "question": "Информация о том, что завтрашние забегули будут проведены в лужах Сертолово, оказалась ложной.",
                "answers": [
                    "информация оказалась ложной;",
                    "забегули будут проведены не в Сертолово;",
                    "забегули будут проведены в Сертолово, но вовсе не в лужах."
                ]
            },
            {
                "question": "Если дать обливуле стакан, она обольётся сразу же. Эта обливуля не облита. Сейчас я дам ей стакан.",
                "answers": [
                    "не надо дразнить обливулю;",
                    "обливуля обольётся;",
                    "обливуля не обольётся."
                ]
            },
            {
                "question": "Если дать покатуле лошадку, она обрадуется сразу же. Эта покатуля не была обрадована.",
                "answers": [
                    "лошадку не давали;",
                    "лошадку давали;",
                    "дали люлей."
                ]
            },
            {
                "question": "Уля бросила этот квест, ответив только на 28 вопросов.",
                "answers": [
                    "Уля-уставуля;",
                    "Уля-заколебуля;",
                    "Уля не закончила квест."
                ]
            },
            {
                "question": "Если покормить жрулю, она успокоится. Со спокойной жрулей можно играть.",
                "answers": [
                    "если жрулю не кормить, с ней нельзя будет играть;",
                    "с жрулей можно играть, но не кормить, она сама чего-нибудь найдет и съест;",
                    "после кормления с жрулей можно играть."
                ]
            },
            {
                "question": "Если обрадовать танцулю, она сделает фуэте. Танцуля обрадуется, если дернуть ее за хвост.",
                "answers": [
                    "если дернуть танцулю за хвост, она сделает фуэте;",
                    "никто не обрадуется, если дернуть его за хвост;",
                    "если не дернуть танцулю за хвост, она не сделает фуэте."
                ]
            }
        ]
    };
    drulya_quiz.setTitle(quiz.title);
    for (var i=0; i<quiz.data.length; i++) {
        drulya_quiz.addQuestion(quiz.data[i].question, quiz.data[i].answers);
    }
    drulya_quiz.update();
    var state = localStorage.getItem("state");
    if (state) {
        drulya_quiz.deserialize(state);
    }
})();