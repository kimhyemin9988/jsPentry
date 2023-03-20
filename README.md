# My Pentry
javascript로 작성한 반응형 web 입니다.
집에 있는 식료품의 이름, 가격, 유통기한을 입력하여 관리할 수 있습니다.
입력후 drag and drop을 이용해 냉장, 냉동, 실온으로 분류하여 관리할 수 있으며,
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


