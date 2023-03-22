# My Pentry
javascript로 작성한 반응형 web 입니다.
집에 있는 식료품의 이름, 가격, 유통기한을 입력하여 관리할 수 있습니다.
유통기한 임박시(D-7 이하) 남은 유통기한 일수를 표시하며, 지났을 경우 사용자에게 알립니다.
입력후 drag and drop을 이용해 냉장, 냉동, 실온으로 분류하여 관리할 수 있으며,
각 항목당 입력된 개수를 표시합니다.
분류된 것을 변경할 수 있습니다.
모든 data는 local storage에 저장됩니다.

기본적인 CURD 작업에 modal창과 drag and drop을 더했습니다.

# [ PC Layout]
<img width="947" alt="readme" src="https://user-images.githubusercontent.com/110611596/224895997-441ee209-d1a3-431c-89eb-cbb312974b77.png">

https://user-images.githubusercontent.com/110611596/224897319-2433bc30-8edd-4496-98eb-ddfd0ab9eded.mp4


# [ Mobile Layout]

![제목 없는 디자인 (3)](https://user-images.githubusercontent.com/110611596/224897058-727fd1be-aebf-4f82-82fe-6c78bccd1155.gif)

# Pages
https://kimhyemin9988.github.io/jsPentry/

# 적용기술

- HTML5, SCSS ,javaScript
- 라이브러리 dragula 사용(모바일 drag and drop)

# HTML 구조
```jsx
    <!-- modal section-->
    <section class="bg-modal hidden">
    // 식료품을 입력할 수 있는 모달창입니다
        ...
            <!-- input form--> 
            <form class="food-form">
                ...
                상품명
                가격
                유효기간
                ...
            </form>
     </section>
                

    <main>
        <button class="tab-btn" id="modal-click">클릭해서 상품을 등록하세요!</button>
         // 식료품 입력 모달창을 여는 버튼
        <section id="stored-box">
        // 입력한 식료품을 보관온도에따라 분류하는 box입니다.
            <div class="temp-box" id="food" /> // 입력한 식료품이 초기에 랜더링되는 box입니다
            <div class="temp-box" id="frozen" /> // 냉동
            <div class="temp-box" id="refrigerated" /> // 냉장
            <div class="temp-box" id="roomTemp" /> // 실온
        </section>
    </main>
```


# 모달창

1. 식료품의 이름, 가격, 유통기한을 입력할 수 있는 모달창입니다.

2. 
    - 입력한 식료품의 분류하지 않고 남아있는 전체 목록을 볼 수 있습니다.
    - 냉동/냉장/상온 보관 식료품의 전체 목록을 볼 수 있습니다.

삭제, 분류 변경시 main과 같이 각 항목의 식료품 개수가 실시간으로 반영됩니다.

# main화면

drag and drop으로 입력된 식료품을 온도별로 분류할 수 있습니다.

모바일 화면은 항목당 3개 이하로 그려지며 PC화면은 각 항목당 6개 이하로 그려집니다.

> create
Viewport당 설정된 제한 개수(모바일 = 3,  PC화면 = 6)의 요소가 분류되지 않고 '목록'칸에 남아있는 경우에 입력시
가장 초기에 입력된 항목이 main 화면에서 지워지고 새로운 요소가 그려집니다.

> drag and drop
- drag :
drag시 요소가 속한 항목(목록,상온,실온,냉동)에 Viewport당 설정된 제한 개수로 인해
그려지지 않은 요소가 있다면 그 중 가장 초기에 입력된 항목이 그려집니다.

- drop :
drop시 요소가 속한 항목에 Viewport당 설정된 제한 개수의 요소가 그려져 있는 경우
가장 초기에 입력된 항목이 지워지고 새로운 요소가 그려집니다.

-delete
삭제되는 요소가 속한 항목에 Viewport당 설정된 제한 개수로 인해
그려지지 않은 요소가 있다면 그 중 가장 초기에 입력된 항목이 그려집니다.