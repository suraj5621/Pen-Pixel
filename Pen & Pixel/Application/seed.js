
const Blog = require('./models/Blog')

let items = [
    {
        title : "Beautiful Scenery for Introverts",
        img :  "https://images.unsplash.com/photo-1707343845208-a20c56d2c8ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8",
        desc : " the general appearance of the natural environment, especially when it is beautiful: beautiful/breathtaking/spectacular scenery. They stopped at the top of the hill to admire the scenery",
        lgdesc : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, accusantium. Architecto illo totam, nihil explicabo quod quidem? Eius dignissimos, repellat doloribus odio ducimus a consequuntur maiores praesentium minus vel. Quas reprehenderit modi, possimus dicta asperiores obcaecati recusandae voluptas dolore debitis voluptatum reiciendis provident sint quam iste rem maxime nisi officia."
    },
    {
        title : "Introverts",
        img :  "https://images.unsplash.com/photo-1707343845208-a20c56d2c8ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8",
        desc : " the general appearance of the natural environment, especially when it is beautiful: beautiful/breathtaking/spectacular scenery. They stopped at the top of the hill to admire the scenery",
        lgdesc : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, accusantium. Architecto illo totam, nihil explicabo quod quidem? Eius dignissimos, repellat doloribus odio ducimus a consequuntur maiores praesentium minus vel. Quas reprehenderit modi, possimus dicta asperiores obcaecati recusandae voluptas dolore debitis voluptatum reiciendis provident sint quam iste rem maxime nisi officia."
    },
    {
        title : "Scenery ",    
        img :  "https://images.unsplash.com/photo-1707343845208-a20c56d2c8ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8",
        desc : " the general appearance of the natural environment, especially when it is beautiful: beautiful/breathtaking/spectacular scenery. They stopped at the top of the hill to admire the scenery",
        lgdesc : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, accusantium. Architecto illo totam, nihil explicabo quod quidem? Eius dignissimos, repellat doloribus odio ducimus a consequuntur maiores praesentium minus vel. Quas reprehenderit modi, possimus dicta asperiores obcaecati recusandae voluptas dolore debitis voluptatum reiciendis provident sint quam iste rem maxime nisi officia."
    }
];

async function seedDB(){
    await Blog.insertMany(items);
    console.log("data seeded successfully");
}

module.exports = seedDB;