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


- **할 일 목록 가져오기**

  서버는 JSON Server을 사용하여, db.json에 있는 todos배열을 axios로 get하여 첫 랜더시 뿌려줍니다.
  todos안에는 하나의 일정이 객체형태로 id, text, checked 프로퍼티를 가지고있습니다.

- **할 일 목록 추가**

  input에 입력하면 새로운객체가 기존배열안에 들어가게 되고, id값은 useRef를 통해 todos안의 객체가 없으면 기본값 1을, 있으면 Math.max로 todos의 id중 가장 큰값에 1을 더한값으로 설정해줍니다. checked는 기본으로 false를 설정해주어 미완료 상태로 두고 onChange이벤트를 통해 value값을 계속 체크하여, onSubmit 이벤트를 통해 엔터 혹은 클릭을 눌렀을 때, text의 프로퍼티값으로 저장됩니다.
  빈 값을 입력했을때는 추가되지 않도록 return을 시켜주었습니다.
  빈 값이 아닐경우에는 axios.post를 통해 db.json에 데이터 정보를 업데이트해줍니다.

- **할 일 완료 및 삭제**

  checked를 눌렀을때는 patch를 통해 완료값을 현재상태와 반대값으로 만들어 업데이트를 해주고
  할일에 hover시, 삭제 아이콘을 보여주어, 눌렀을때 axion delete를 통해 해당 할일목록
  요소를 제거해줍니다
