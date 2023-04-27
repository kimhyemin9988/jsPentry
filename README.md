# My Pentry
javascript로 작성한 반응형 web 입니다.
집에 있는 식료품의 이름, 가격, 유통기한을 입력하여 관리할 수 있습니다.
유통기한 임박시(D-7 이하) 남은 유통기한 일수를 표시하며, 지났을 경우 사용자에게 알립니다.
입력후 drag and drop을 이용해 냉장, 냉동, 실온으로 분류하여 관리할 수 있으며,
각 항목당 입력된 개수를 표시합니다.
분류된 것을 변경할 수 있습니다.
모든 data는 local storage에 저장됩니다.

기본적인 CRUD 작업에 modal창과 drag and drop을 더했습니다.

# [ PC Layout ]
<img width="947" alt="12" src="https://user-images.githubusercontent.com/110611596/227181126-236d9d05-0093-4903-9ec1-eb791705cdb3.png">

![입력-_online-video-cutter com_](https://user-images.githubusercontent.com/110611596/227182403-5d89b57d-4647-48b1-b539-700c77380692.gif)

![dragModal-_online-video-cutter com_](https://user-images.githubusercontent.com/110611596/227182436-b4343d2a-7644-45f3-a46a-48e31744aa05.gif)


# [ Mobile Layout ]


<img width="242" alt="1" src="https://user-images.githubusercontent.com/110611596/227182285-cfc9e200-0b8d-4a7d-83cd-0bf4e5388e72.png">

https://user-images.githubusercontent.com/110611596/230736100-de014b39-eb89-415e-852d-42d7f75003c1.mp4


# Page
https://kimhyemin9988.github.io/jsPentry/

# 적용기술

- HTML5, SCSS ,javaScript
- 라이브러리 dragula 사용(모바일 drag and drop)

# HTML 구조
```jsx
    <!-- modal div-->
    <div class="bg-modal hidden">
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
     </div>
                

    <main>
        <button class="tab-btn" id="modal-click">클릭해서 상품을 등록하세요!</button>
         // 식료품 입력 모달창을 여는 버튼
        <div id="stored-box">
        // 입력한 식료품을 보관온도에따라 분류하는 box입니다.
            <div class="temp-box" id="food" /> // 입력한 식료품이 초기에 랜더링되는 box입니다
            <div class="temp-box" id="frozen" /> // 냉동
            <div class="temp-box" id="refrigerated" /> // 냉장
            <div class="temp-box" id="roomTemp" /> // 실온
        </div>
    </main>
```


# 모달창

1. 식료품의 이름, 가격, 유통기한을 입력할 수 있는 모달창입니다.

2. 
    - 입력한 식료품의 분류하지 않고 남아있는 전체 목록을 볼 수 있습니다.
    - 냉동/냉장/상온 보관 식료품의 전체 목록을 볼 수 있습니다.

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

> delete
삭제되는 요소가 속한 항목에 Viewport당 설정된 제한 개수로 인해
그려지지 않은 요소가 있다면 그 중 가장 초기에 입력된 항목이 그려집니다.
