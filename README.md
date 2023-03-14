# My Pentry
javascript로 작성한 반응형 web 입니다.
집에 있는 식료품의 이름, 가격, 유통기한을 입력하여 관리할 수 있습니다.
입력후 냉장, 냉동, 실온으로 분류하여 관리할 수 있으며,
분류된 것을 변경할 수 있습니다.
모든 data는 local storage에 저장됩니다.

# [ PC Layout]
<img width="947" alt="readme" src="https://user-images.githubusercontent.com/110611596/224895997-441ee209-d1a3-431c-89eb-cbb312974b77.png">

https://user-images.githubusercontent.com/110611596/224897319-2433bc30-8edd-4496-98eb-ddfd0ab9eded.mp4


# [ Mobile Layout]

![제목 없는 디자인 (3)](https://user-images.githubusercontent.com/110611596/224897058-727fd1be-aebf-4f82-82fe-6c78bccd1155.gif)

# Pages
https://kimhyemin9988.github.io/jsPentry/

# 적용기술

- HTML5, SCSS ,javaScript


# HTML 구조
```jsx
    <!-- modal section-->
    <section class="bg-modal hidden">
        ...
            <!-- input form--> 
            <form class="food-form"> // 식료
            ...
                <label for="food-name">상품명</label>
                <input id="food-name" maxlength="10" autofocus required>
                <label for="food-price">가격</label>
                <input id="food-price" type="number" min="0" required>
                <label for="ex-date">유효기간</label>
                <input id="ex-date" type="date" placeholder="유통기한을 설정하세요" required>
                <button class="tab-btn enroll">등록</button>
                <p class="submit-alarm hidden">등록되었습니다</p>
            </form>
        </div>
    </section>
    <header>
        <div class="homeLogo">
            <a href="index.html">MyPentry</a>
        </div>
    </header>
    <main>
        <button class="tab-btn" id="modal-click">클릭해서 상품을 등록하세요!</button>
        <section class="input-food-box" id="food">
            <button class="entire-li-btn">+</button>
            <p>목록</p>
            <ul id="food-list">
            </ul>
        </section>
        <section id="stored-box">
            <div class="temp-box" id="frozen">
                <button class="entire-li-btn">+</button>
                <p>냉동</p>
            </div>
            <div class="temp-box" id="refrigerated">
                <button class="entire-li-btn">+</button>
                <p>냉장</p>
            </div>
            <div class="temp-box" id="roomTemp">
                <button class="entire-li-btn">+</button>
                <p>상온</p>
            </div>
        </section>
    </main>
```
