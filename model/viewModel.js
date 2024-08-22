const {PrismaClient, Prisma} = require('@prisma/client');
const client = new PrismaClient();

module.exports = {
    getPort: async() => {
        const data = await client.$queryRaw`SELECT "posts".id, "posts".image, "posts".title, "posts".description, "posts".time,"posts".userrid, "users".name as user, "users".job as job FROM "posts"
        JOIN "users" ON "posts".userrid = "users".id
        ` 
       return data;
   },
   singlePort: async(genId) => {
    const data = await client.$queryRaw`SELECT "posts".id, "posts".image, "posts".title, "posts".description, "posts".time, "users".name as user, "users".job as job FROM "posts"
    JOIN "users" ON "posts".userrid = "users".id
    WHERE "posts".id = ${genId}` 
  
   return data;
},
postLogin: async(id) => {
    const data = await client.$queryRaw`SELECT "role".id, "role".possion, "users".* FROM users 
    JOIN "role" ON "users".roleid  = "role".id
    WHERE  users.id = ${id}`
    return data;
},
 
   postPort : async(title,img,des,time,userrid) => {
    const create = await client.$queryRaw`INSERT INTO posts (title,image,description,time,userrid) VALUES ( ${title},${img},${des},${time},${userrid})`
    //  const updatebookauthor = await client.$queryRaw`INSERT INTO post_categories (postid, categorieid) VALUES (5,5),(6,6)`
    return create;
   },
   detailPort: async(genId) => {
       const data = await client.$queryRaw`SELECT * FROM "posts" WHERE id=${genId}`
        return data;
   },
   delePort: async(genId) => {
    const dele1 = await client.$queryRaw`
        DELETE FROM post_categories
        WHERE post_categories.postid IN (
            SELECT posts.id FROM posts
            JOIN post_categories ON posts.id = post_categories.postid
            WHERE posts.id = ${genId}
        )
        `;
       
      const data1 = await client.$queryRaw`DELETE FROM comments
      WHERE id IN (SELECT comments.id FROM comments
     JOIN posts ON posts.id = comments.postid
     WHERE posts.id = ${genId})`;
       const data = await client.$queryRaw`DELETE FROM "posts" WHERE id=${genId}`
       return {dele1,data1,data};

   },
   viewPort: async(genId,title,image,des,time,userrid) => {
    const update = await client.$queryRaw`UPDATE "posts" SET title=${title},image=${image}, description=${des}, time=${time}, userrid=${userrid} WHERE id = ${genId} `
    return update;

   },

// CATEGORIES
getCate: async() => {
    const data = await client.$queryRaw`SELECT * FROM categories`
   return data;
},
postCate : async(name) => {
const create = await client.$queryRaw`INSERT INTO categories (name) VALUES ( ${name})`;
return create;
},
detailCate: async(genId) => {
   const data = await client.$queryRaw`SELECT * FROM "categories" WHERE id=${genId}`
    return data;
},
deleCate: async(genId) => {
   const data = await client.$queryRaw`DELETE FROM  post_categories   WHERE post_categories.postid IN (
    SELECT posts.id FROM posts
    JOIN post_categories ON posts.id = post_categories.postid
    JOIN categories ON post_categories.categorieid = categories.id
    WHERE categories.id = ${genId}
    )`

    const data1 = await client.$queryRaw`DELETE FROM categories WHERE id=${genId}`
   return data,data1;

},
    viewCate: async(genId,name) => {
    const update = await client.$queryRaw`UPDATE "categories" SET name=${name} WHERE id = ${genId} `
    return update;

},

//COMMENT
    getCom: async(genId) => {
        const data = await client.$queryRaw`SELECT "users".avata, "users".name, "comments".* FROM comments
        JOIN "users" ON "comments".userid = "users".id
        JOIN "posts" ON "comments".postid = "posts".id
        WHERE "comments".postid = ${genId}`  
    return data;
},

getComment: async() => {
    const data = await client.$queryRaw`SELECT "users".avata, "users".name, "comments".* FROM comments
    JOIN "users" ON "comments".userid = "users".id
    
    `  
return data;
},
    postCom: async(year,info,user,post) => {
    const create =  await client.$queryRaw`INSERT INTO comments (year,information, userid, postid) VALUES ( ${year},${info},${parseInt(user)},${parseInt(post)})`;
    return create;
},
 detailCom: async(genId) => {
    const data = await client.$queryRaw`SELECT * FROM "comments" WHERE id=${genId}`
        return data;
},
deleCom: async(genId) => {
   
     const data1 =await client.$queryRaw`DELETE FROM comments WHERE id=${genId}`
    return {data1};
 },
     viewCom: async(genId,year,info,user,post) => {
     const update =  await client.$queryRaw`UPDATE "comments" SET year=${year}, information=${info},userid=${user} ,postid=${post}  WHERE id = ${genId} `
     return update;
 
 },

 //USER
 getUser: async() => {
    const data = await client.$queryRaw`SELECT * FROM "users"`  
   return data;
},
getUserrole: async() => {
    const data = await client.$queryRaw`SELECT "role".possion, "users".* FROM users
    JOIN "role" ON "users".roleid = "role".id
    WHERE "role".possion IN ('Blogger')`  
   return data;
},

createUser : async(name,avata,mail,job,pass,des,rolee) => {
    console.log(1)
const create = await client.$queryRaw`INSERT INTO users (name,avata,mail,job,pass,roleid,description) VALUES ( ${name},${avata},${mail},${job},${pass},${rolee},${des})`;
return create;
},

detailUser: async(genId) => {
   const data = await client.$queryRaw`SELECT * FROM "users" WHERE id=${genId}`
    return data;
},
deleUser: async(genId) => {
   const data = await client.$queryRaw`DELETE FROM posts
   WHERE id IN (SELECT posts.id FROM posts
  JOIN users ON users.id = posts.userrid
  WHERE users.id = ${genId})`;
  const dele1 = await client.$queryRaw`DELETE FROM comments
  WHERE id IN (SELECT comments.id FROM comments
 JOIN users ON users.id = comments.userid
 WHERE users.id = ${genId});`


 const dele2 = await client.$queryRaw`DELETE FROM users WHERE id=${genId}`
    
   return data,dele1,dele2;

},
viewUser: async(genId,name,avata,mail,job,pass,rolee,des) => {
    const update = await client.$queryRaw`UPDATE "users" SET name=${name}, avata=${avata},mail=${mail},job=${job},pass=${pass},roleid=${rolee},description=${des} WHERE id = ${genId} `
    return update;

},

//profile
getPro: async() => {
    const data = await client.$queryRaw`SELECT * FROM profile` 
   return data;
},
postPro : async(title,image,des,cont,mail,phone,add) => {
const create = await client.$queryRaw`INSERT INTO profile (title,image,description,content,mail,phone,address) VALUES ( ${title},${image},${des},${cont},${mail},${phone},${add})`;
return create;
},
detailPro: async(genId) => {
   const data = await client.$queryRaw`SELECT * FROM "profile" WHERE id=${genId}`
    return data;
},
delePro: async(genId) => {
   const data = await client.$queryRaw`DELETE FROM profile WHERE id=${genId}`
   return data;

},
viewPro: async(genId,title,image,des,cont,mail,phone,add) => {
const update = await client.$queryRaw`UPDATE "profile" SET title=${title}, image=${image},description=${des},content=${cont},mail=${mail},phone=${phone}, address=${add} WHERE id = ${genId} `
return update;

},

//VISION
getVi: async() => {
    const data = await client.$queryRaw`SELECT * FROM vision` 
   return data;
},
postVi : async(image,title,des) => {
const create = await client.$queryRaw`INSERT INTO vision (icon,title,description) VALUES ( ${image},${title},${des})`;
return create;
},
detailVi: async(genId) => {
   const data = await client.$queryRaw`SELECT * FROM "vision" WHERE id=${genId}`
    return data;
},
deleVi: async(genId) => {
   const data = await client.$queryRaw`DELETE FROM vision WHERE id=${genId}`
   return data;

},
viewVi: async(genId,image,title,des) => {
const update = await client.$queryRaw`UPDATE "vision" SET  icon=${image},title=${title},description=${des} WHERE id = ${genId} `
return update;

},

//ROLE
getRole: async() => {
    const data = await client.$queryRaw`SELECT * FROM role`
   return data;
},
postRole : async(possion) => {
const create =await client.$queryRaw`INSERT INTO role (possion) VALUES ( ${possion})`;
return create;
},
detailRole: async(genId) => {
   const data = await client.$queryRaw`SELECT * FROM "role" WHERE id=${genId}`
    return data;
},
deleRole: async(genId) => {
    
   const data = await client.$queryRaw`DELETE FROM users
   WHERE id IN (SELECT users.id FROM users
  JOIN role ON role.id = users.roleid
  WHERE role.id = ${genId})`;
  const dele1 = await client.$queryRaw`DELETE FROM role WHERE id=${genId}`
   return {data,dele1};

},
viewRole: async(genId,possion) => {
const update = await client.$queryRaw`UPDATE "role" SET possion=${possion} WHERE id = ${genId} `
return update;

},

 //CONTACT

 getCtc: async() => {
    const data = await client.$queryRaw`SELECT * FROM contact`  
    return data;
},
postCtc : async(name,mail,subject,mess) => {
    const createctc = await client.$queryRaw`INSERT INTO contact (name,mail,subject,message) VALUES ( ${name},${mail},${subject},${mess})`;
    return createctc;
},
detailCtc: async(genId) => {
 const data = await client.$queryRaw`SELECT * FROM "contact" WHERE id=${genId}`
 return data;
 },
 deleCtc: async(genId) => {
     const data = await client.$queryRaw`DELETE FROM contact WHERE id=${genId}`
     return data;

 },
 viewCtc: async(genId,name,mail,subject,mess) => {
    const updateskill = await client.$queryRaw`UPDATE "contact" SET name=${name}, mail=${mail},subject=${subject},message=${mess} WHERE id = ${genId} `
    return updateskill;

 },
 //SOCIAL

 getSocial: async() => {
    const data = await client.$queryRaw`SELECT * FROM social` 
    return data;
},
postSocial : async(name,image,link) => {
    const create = await client.$queryRaw`INSERT INTO social (name,image,link) VALUES ( ${name},${image},${link})`;
    return create;
},
detailSocial: async(genId) => {
    const data = await client.$queryRaw`SELECT * FROM "social" WHERE id=${genId}`
    return data;
    },
    deleSocial: async(genId) => {
        const data = await client.$queryRaw`DELETE FROM social WHERE id=${genId}`
        return data;

    },
    viewSocial: async(genId,name,image,link) => {
       const updateskill = await client.$queryRaw`UPDATE "social" SET name=${name}, image=${image},link=${link} WHERE id = ${genId} `
       return updateskill;

    },
    checkimg: async (image,data) => {
        var img = null;
        if(image == undefined){
            if(data.length != 0){
               img = data[0].image || data[0].avata;

            }else {
               img = "assets/uploads/icon-04.png" 
            }

        }else {
            img = "assets/uploads/" + image.filename;
        }
        return img;
    }


}