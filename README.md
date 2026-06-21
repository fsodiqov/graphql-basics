# GraphQL Mashqi

> **GraphQL** — bu API'lar uchun zamonaviy so'rov tilidir. REST o'rniga yoki uning yonida ishlatiladi va klientga aynan kerak bo'lgan ma'lumotni so'rash imkonini beradi.

---

## GraphQL nima?

**GraphQL** — Facebook (hozirgi Meta) tomonidan 2012-yilda ishlab chiqilgan va 2015-yilda ochiq manba qilingan so'rov tili va runtime. U server va klient o'rtasidagi ma'lumot almashinuvini sodda va moslashuvchan qiladi.

Agar REST'da har bir resurs uchun alohida endpoint bo'lsa (`/users`, `/posts`, `/comments`), GraphQL'da **bitta endpoint** orqali kerakli ma'lumotni aniq so'rashingiz mumkin.

```
REST:     GET /users/1
          GET /users/1/posts
          GET /posts/5/comments   → 3 ta so'rov

GraphQL:  POST /graphql
          { user(id: 1) { name, posts { title, comments { text } } } }
          → 1 ta so'rov
```

---

## Asosiy tushunchalar

| Tushuncha | Vazifasi |
|-----------|----------|
| **Schema** | API'ning "shartnomasi" — qanday ma'lumotlar mavjudligi va qanday so'rash mumkinligi |
| **Query** | Ma'lumot **o'qish** (READ) |
| **Mutation** | Ma'lumot **yozish/o'zgartirish** (CREATE, UPDATE, DELETE) |
| **Subscription** | Real-time ma'lumot olish (WebSocket orqali) |
| **Resolver** | Har bir maydon uchun ma'lumotni qayerdan olishni belgilovchi funksiya |
| **Type** | Ma'lumot strukturasi (`User`, `Post`, `Comment` va hokazo) |

---

## GraphQL vs REST

| Xususiyat | REST | GraphQL |
|-----------|------|---------|
| Endpointlar | Ko'p (`/users`, `/posts`...) | Bitta (`/graphql`) |
| Ma'lumot hajmi | Server belgilaydi (over-fetching) | Klient belgilaydi |
| So'rovlar soni | Ko'p (N+1 muammosi) | Kam (bir so'rovda ko'p ma'lumot) |
| Hujjatlashtirish | Swagger/OpenAPI | Schema o'z-o'zidan hujjat |
| O'rganish | Osonroq boshlash | Biroz murakkabroq, lekin kuchliroq |

---

## Oddiy misol

```graphql
# So'rov (Query)
query {
  user(id: "1") {
    name
    email
    posts {
      title
      createdAt
    }
  }
}

# Javob (Response)
{
  "data": {
    "user": {
      "name": "Ali",
      "email": "ali@example.com",
      "posts": [
        { "title": "GraphQL haqida", "createdAt": "2025-01-15" }
      ]
    }
  }
}
```

---

## Nima uchun GraphQL?

- **Over-fetching yo'q** — faqat kerakli maydonlarni olasiz
- **Under-fetching yo'q** — bir so'rovda bog'liq ma'lumotlarni ham olasiz
- **Kuchli tipizatsiya** — schema xatolarni erta aniqlaydi
- **Zamonaviy ekotizim** — Apollo, Relay, Hasura, Prisma va boshqalar

---

## Bu repoda nima qilamiz?

Bu repository GraphQL asoslarini amaliy mashq qilish uchun yaratilgan. Bosqichma-bosqich quyidagilarni o'rganamiz:

- [ ] GraphQL schema yozish
- [ ] Query va Mutation yaratish
- [ ] Resolver funksiyalar
- [ ] Apollo Server bilan server qurish
- [ ] Klientdan so'rov yuborish

---

## Foydali havolalar

- [GraphQL rasmiy sayti](https://graphql.org)
- [GraphQL specifikatsiyasi](https://spec.graphql.org)
- [Apollo Server hujjatlari](https://www.apollographql.com/docs/apollo-server/)
- [How to GraphQL](https://www.howtographql.com) — bepul o'quv kursi

---

## Muallif

O'rganish jarayonida yaratilgan mashq loyihasi.
