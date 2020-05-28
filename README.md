# asman-fp-apl
Implementing Clean Architecture and DDD in Asset management (AsMan) study case, Software Architecture course.  
program ini hanyalah backend, cek branch frontend untuk jalankan frontend, atau gunakan postman untuk test API. detail uri ada di controller (``src/ui/http/express/controllers/``)
   
## catatan revisi   
1. pindah semua bisnis logik ke model (``src/domain/models/``)
2. pindah semua aplikasi logik ke application (``src/application/``)
3. ubah modul/usecase reservasi menjadi modul rental/rent   
   
## Getting Started / backend run
1. Get nodes modules  
``npm install``
2. config the dotenv file
3. Migrate the database  
``npx sequelize db:migrate``
4. Seeding data to the database  
``npx sequelize db:seed:all``
5. Start app  
``npm run start``   

## Frontend run
1. change branch to frontend
2. get nodes modules
3. make sure the baseURL on request.js file is same with backend
4. npm start

   
## Contributor  
- 05111640000104 - [Muhajir bin abdul latief](https://github.com/muhajirrr)
- 05111640000134 - [Muhammad Alam Cahya N](https://github.com/alam3211)
- 05111740000183 - [Rizky Andre Wibisono](https://github.com/rizanw)
