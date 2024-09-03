const {PrismaClient, Prisma} = require('@prisma/client');
const { name } = require('ejs');
const client = new PrismaClient();

module.exports = {
    getPort: async() => {
        const data = await client.posts.findMany({
           
            select: {
                id: true,
                image: true,
                title: true,
                description: true,
                time: true,
                userrid: true,
                userr: {
                    select: {
                    name: true,
                    job: true
                }}
            }
        })
       return data;
    },
   getPage: async(page) => {
    const data = await client.posts.findMany({
        skip: page,
        take: 4,
        select: {
            id: true,
            image: true,
            title: true,
            description: true,
            time: true,
            userrid: true,
            userr: {
                select: {
                name: true,
                job: true
            }}
        }
    })
   return data;
},
   singlePort: async(genId) => {
    const data = await client.posts.findUnique({
        where: {id:genId},
        select: {
            id: true,
            image: true,
            title: true,
            description: true,
            time: true,
            userr: {
                select: {
                    name: true,
                    job: true
                }
            }
        }
    })
  
   return data;
},
postLogin: async(id) => {
    const data = await client.users.findMany({
        where: {id: id},
        select : {
            id:  true,
            name: true,
            avata: true,
            job: true,
            description: true,
            pass: true,
            role: {
                select: {
                    id: true,
                    possion: true
                }
            }
        }
    })
    return data;
},
 
   postPort : async(title,img,des,time,userrid) => {
    const create = await client.posts.create({
        data: {
            title: title,
            image: img,
            description: des,
            time: time,
            userrid: userrid
        }
    })
    return create;
   },
   detailPort: async(genId) => {
       const data = await client.posts.findUnique({ where: {id:genId}})
        return data;
   },
   delePort: async(genId) => {
    const dele1 = await client.post_categories.deleteMany({
        where: {
            postid : genId
        }
    });
       
      const data1 = await client.comments.deleteMany({where: {postid: genId}});
       const data = await client.posts.deleteMany({where: {id: genId}})
       return {dele1,data1,data};

   },
   viewPort: async(genId,title,image,des,time,userrid) => {
    const update = await client.posts.update({
        where: {id:genId},
        data: {
            title: title,
            image: image,
            description: des,
            time: time,
            userrid: userrid
        }
    })
    return update;

   },

// CATEGORIES
getCate: async() => {
    const data = await client.categories.findMany();
   return data;
},
postCate : async(name) => {
const create = await client.categories.create({
    data: {
        name: name
    }
})
return create;
},
detailCate: async(genId) => {
   const data = await client.categories.findUnique({where: {id:genId}})
    return data;
},
deleCate: async(genId) => {
   const data = await client.post_categories.deleteMany({

    where: {
           categorieid: genId
    }
   })

    const data1 = await client.categories.deleteMany({where: {id: genId}})
   return data,data1;

},
    viewCate: async(genId,name) => {
    const update = await client.categories.update({
        where: {id:genId},
        data: {
            name: name
        }
    })
    return update;

},

//COMMENT
    getCom: async(genId) => {
        const data = await client.comments.findMany({
            where: {postid : genId},
            select: {
                id: true,
                year: true,
                information: true,
                userid: true,
                postid: true,
                user: {
                    select: {
                        avata: true,
                        name: true
                    }
                }

            }
        })
    return data;
},

getComment: async() => {
    const data = await client.comments.findMany({
        select: {
            id: true,
            year: true,
            information: true,
            userid: true,
            postid: true,
            user: {
                select: {
                    avata: true,
                    name: true
                }
            }
        }
    })
return data;
},
    postCom: async(year,info,user,post) => {
    const create =  await client.comments.create({
        data: {
            year: year,
            information: info,
            userid: parseInt(user),
            postid: parseInt(post)
        }
    })
    return create;
},
 detailCom: async(genId) => {
    const data = await client.comments.findUnique({where: {id: genId}})
        return data;
},
deleCom: async(genId) => {
   
     const data1 =await client.comments.deleteMany({where: {id:genId}})
    return {data1};
 },
     viewCom: async(genId,year,info,user,post) => {
     const update =  await client.comments.update({
        where: {id:genId},
        data: {
            year: year,
            information:info,
            userid: user,
            postid: post
        }
     })
     return update;
 
 },

 //USER
 getUser: async() => {
    const data = await client.users.findMany(); 
   return data;
},

getUserrole: async() => {
    const data = await client.users.findMany({
        where: {
            role: {
               possion: 'Blogger'
        }},
        select: {
           
           id:  true,
           name: true,
           avata: true,
           job: true,
           description: true,
           pass: true,
           roleid: true,
           role: {
            select: {
                possion: true
            }
           }
        }
    })
},

createUser : async(name,avata,mail,job,pass,des,rolee) => {
    console.log(1)
const create = await client.users.create({
    data: {
        name: name,
        avata: avata,
        mail: mail,
        job: job,
        pass: pass,
        roleid: rolee,
        description: des
    }
})
return create;
},

detailUser: async(genId) => {
   const data = await client.users.findUnique({where: {id:genId}})
    return data;
},
deleUser: async(genId) => {
   const data = await client.posts.deleteMany({
    where: {
        userrid : genId
    }
   })
  const dele1 = await client.comments.deleteMany({where: {userid:genId}})


 const dele2 = await client.users.deleteMany({where: {id:genId}})
    
   return data,dele1,dele2;

},
viewUser: async(genId,name,avata,mail,job,pass,rolee,des) => {
    const update = await client.users.update({
        where: {id:genId},
        data: {
            name: name,
            avata: avata,
            mail: mail,
            job: job,
            pass: pass,
            roleid: rolee,
            description: des
        }
    })
    return update;

},

//profile
getPro: async() => {
    const data = await client.profile.findMany();
   return data;
},
postPro : async(title,image,des,cont,mail,phone,add) => {
const create = await client.profile.create({
    data: {
        title: title,
        image: image,
        description: des,
        content: cont,
        mail: mail,
        phone: phone,
        address: add
    }
})
return create;
},
detailPro: async(genId) => {
   const data = await client.profile.findUnique({where: {id:genId}})
    return data;
},
delePro: async(genId) => {
   const data = await client.profile.deleteMany({where: {id:genId}})
   return data;

},
viewPro: async(genId,title,image,des,cont,mail,phone,add) => {
const update = await client.profile.update({
    where: {id: genId},
    data: {
        title: title,
        image: image,
        description: des,
        content: cont,
        mail: mail,
        phone: phone,
        address: add
    }
})
return update;

},

//VISION
getVi: async() => {
    const data = await client.vision.findMany() 
   return data;
},
postVi : async(img,title,des) => {
const create = await client.vision.create({
    data: {
        icon: img,
        title: title,
        description: des
    }
})
return create;
},
detailVi: async(genId) => {
   const data = await client.vision.findUnique({where: {id:genId}})
    return data;
},
deleVi: async(genId) => {
   const data = await client.vision.deleteMany({where: {id:genId}})
   return data;

},
viewVi: async(genId,img,title,des) => {
const update = await client.vision.update({
    where: {id:genId},
    data: {
        icon: img,
        title: title,
        description: des
    }
})
return update;

},

//ROLE
getRole: async() => {
    const data = await client.role.findMany()
   return data;
},
postRole : async(possion) => {
const create =await client.role.create({
    data: {
        possion: possion
    }
})
return create;
},
detailRole: async(genId) => {
   const data = await client.role.findUnique({where: {id:genId}})
    return data;
},
deleRole: async(genId) => {
    
   const data = await client.users.deleteMany({
    where: {roleid: genId},
   })
  const dele1 = await client.role.deleteMany({where: {id:genId}})
   return {data,dele1};

},
viewRole: async(genId,possion) => {
const update = await client.role.update({
    where: {id:genId},
    data: {
        possion: possion
    }
})
return update;

},

 //CONTACT

 getCtc: async() => {
    const data = await client.contact.findMany()
    return data;
},
postCtc : async(name,mail,subject,mess) => {
    const createctc = await client.contact.create({
        data: {
            name: name,
            mail: mail,
            subject: subject,
            message: mess
        }
    })
    return createctc;
},
detailCtc: async(genId) => {
 const data = await client.contact.findUnique({where: {id:genId}})
 return data;
 },
 deleCtc: async(genId) => {
     const data = await client.contact.deleteMany({where: {id:genId}})
     return data;

 },
 viewCtc: async(genId,name,mail,subject,mess) => {
    const updateskill = await client.contact.update({
        where: {id:genId},
        data: {
            name: name,
            mail: mail,
            subject: subject,
            message: mess
        }
    })
    return updateskill;

 },
 //SOCIAL

 getSocial: async() => {
    const data = await client.social.findMany()
    return data;
},
postSocial : async(name,image,link) => {
    const create = await client.social.create({
        data: {
            name: name,
            image: image,
            link: link
        }
    })
    return create;
},
detailSocial: async(genId) => {
    const data = await client.social.findUnique({where: {id:genId}})
    return data;
    },
    deleSocial: async(genId) => {
        const data = await client.social.deleteMany({where: {id:genId}})
        return data;

    },
    viewSocial: async(genId,name,image,link) => {
       const updateskill = await client.social.update({
        where: {id: genId},
        data: {
            name: name,
            image: image,
            link: link
        }
       })
       return updateskill;

    },
    checkimg: async (image,data) => {
        var img = null;
        if(image == undefined){
            if(data.length != 0){
               img = data.image || data.avata;

            }else {
               img = "assets/uploads/icon-04.png" 
            }

        }else {
            img = "assets/uploads/" + image.filename;
        }
        return img;
    }


}