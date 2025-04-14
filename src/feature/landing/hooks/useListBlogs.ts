export const useListBlogs = () => {
  const blogs = [
    {
      id: "1",
      title: "Blog 1",
      slugs: "blog-1",
      tumbnail:
        "https://images.unsplash.com/photo-1616020453784-a24fa9845b05?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      article:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est adipisci sit vero, distinctio totam dolorum laboriosam earum qui. Perspiciatis quod blanditiis tempora, consectetur tempore asperiores consequuntur nobis labore dignissimos iure distinctio nihil, officia eveniet dolorum eos. Ipsa magni temporibus ea omnis, nemo velit nostrum, quos, doloremque quod sapiente dolorem fugit nulla ut ad reiciendis commodi iste esse. Dignissimos, rem qui perspiciatis pariatur laborum vero ipsam praesentium tempora in laboriosam! Atque, sapiente iusto? Porro assumenda a itaque commodi, quod quibusdam reprehenderit possimus iusto similique ullam! Voluptates deserunt libero reiciendis non, quasi architecto dolorem, voluptate assumenda error nemo a perferendis nobis dignissimos?",
      created_at: "2023-10-01",
      user: {
        id: "1",
        name: "John Doe",
      },
      commentslength: 10,
    },
    {
      id: "2",
      title: "Blog 2",
      slugs: "blog-2",
      tumbnail:
        "https://images.unsplash.com/photo-1616020453784-a24fa9845b05?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      article:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est adipisci sit vero, distinctio totam dolorum laboriosam earum qui. Perspiciatis quod blanditiis tempora, consectetur tempore asperiores consequuntur nobis labore dignissimos iure distinctio nihil, officia eveniet dolorum eos. Ipsa magni temporibus ea omnis, nemo velit nostrum, quos, doloremque quod sapiente dolorem fugit nulla ut ad reiciendis commodi iste esse. Dignissimos, rem qui perspiciatis pariatur laborum vero ipsam praesentium tempora in laboriosam! Atque, sapiente iusto? Porro assumenda a itaque commodi, quod quibusdam reprehenderit possimus iusto similique ullam! Voluptates deserunt libero reiciendis non, quasi architecto dolorem, voluptate assumenda error nemo a perferendis nobis dignissimos?",
      created_at: "2023-10-01",
      user: {
        id: "1",
        name: "John Doe",
      },
      commentslength: 15,
    },
    {
      id: "3",
      title: "Blog 3",
      slugs: "blog-3",
      tumbnail:
        "https://images.unsplash.com/photo-1616020453784-a24fa9845b05?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      article:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est adipisci sit vero, distinctio totam dolorum laboriosam earum qui. Perspiciatis quod blanditiis tempora, consectetur tempore asperiores consequuntur nobis labore dignissimos iure distinctio nihil, officia eveniet dolorum eos. Ipsa magni temporibus ea omnis, nemo velit nostrum, quos, doloremque quod sapiente dolorem fugit nulla ut ad reiciendis commodi iste esse. Dignissimos, rem qui perspiciatis pariatur laborum vero ipsam praesentium tempora in laboriosam! Atque, sapiente iusto? Porro assumenda a itaque commodi, quod quibusdam reprehenderit possimus iusto similique ullam! Voluptates deserunt libero reiciendis non, quasi architecto dolorem, voluptate assumenda error nemo a perferendis nobis dignissimos?",
      created_at: "2023-10-01",
      user: {
        id: "1",
        name: "John Doe",
      },
      commentslength: 2,
    },
    {
      id: "4",
      title: "Blog 4",
      slugs: "blog-4",
      tumbnail:
        "https://images.unsplash.com/photo-1616020453784-a24fa9845b05?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      article:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est adipisci sit vero, distinctio totam dolorum laboriosam earum qui. Perspiciatis quod blanditiis tempora, consectetur tempore asperiores consequuntur nobis labore dignissimos iure distinctio nihil, officia eveniet dolorum eos. Ipsa magni temporibus ea omnis, nemo velit nostrum, quos, doloremque quod sapiente dolorem fugit nulla ut ad reiciendis commodi iste esse. Dignissimos, rem qui perspiciatis pariatur laborum vero ipsam praesentium tempora in laboriosam! Atque, sapiente iusto? Porro assumenda a itaque commodi, quod quibusdam reprehenderit possimus iusto similique ullam! Voluptates deserunt libero reiciendis non, quasi architecto dolorem, voluptate assumenda error nemo a perferendis nobis dignissimos?",
      created_at: "2023-10-01",
      user: {
        id: "1",
        name: "John Doe",
      },
      commentslength: 8,
    },
    {
      id: "4",
      title: "Blog 4",
      slugs: "blog-4",
      tumbnail:
        "https://images.unsplash.com/photo-1616020453784-a24fa9845b05?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      article:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est adipisci sit vero, distinctio totam dolorum laboriosam earum qui. Perspiciatis quod blanditiis tempora, consectetur tempore asperiores consequuntur nobis labore dignissimos iure distinctio nihil, officia eveniet dolorum eos. Ipsa magni temporibus ea omnis, nemo velit nostrum, quos, doloremque quod sapiente dolorem fugit nulla ut ad reiciendis commodi iste esse. Dignissimos, rem qui perspiciatis pariatur laborum vero ipsam praesentium tempora in laboriosam! Atque, sapiente iusto? Porro assumenda a itaque commodi, quod quibusdam reprehenderit possimus iusto similique ullam! Voluptates deserunt libero reiciendis non, quasi architecto dolorem, voluptate assumenda error nemo a perferendis nobis dignissimos?",
      created_at: "2023-10-01",
      user: {
        id: "1",
        name: "John Doe",
      },
      commentslength: 10,
    },
    {
      id: "4",
      title: "Blog 4",
      slugs: "blog-4",
      tumbnail:
        "https://images.unsplash.com/photo-1616020453784-a24fa9845b05?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      article:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est adipisci sit vero, distinctio totam dolorum laboriosam earum qui. Perspiciatis quod blanditiis tempora, consectetur tempore asperiores consequuntur nobis labore dignissimos iure distinctio nihil, officia eveniet dolorum eos. Ipsa magni temporibus ea omnis, nemo velit nostrum, quos, doloremque quod sapiente dolorem fugit nulla ut ad reiciendis commodi iste esse. Dignissimos, rem qui perspiciatis pariatur laborum vero ipsam praesentium tempora in laboriosam! Atque, sapiente iusto? Porro assumenda a itaque commodi, quod quibusdam reprehenderit possimus iusto similique ullam! Voluptates deserunt libero reiciendis non, quasi architecto dolorem, voluptate assumenda error nemo a perferendis nobis dignissimos?",
      created_at: "2023-10-01",
      user: {
        id: "1",
        name: "John Doe",
      },
      commentslength: 10,
    },
    {
      id: "4",
      title: "Blog 4",
      slugs: "blog-4",
      tumbnail:
        "https://images.unsplash.com/photo-1616020453784-a24fa9845b05?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      article:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est adipisci sit vero, distinctio totam dolorum laboriosam earum qui. Perspiciatis quod blanditiis tempora, consectetur tempore asperiores consequuntur nobis labore dignissimos iure distinctio nihil, officia eveniet dolorum eos. Ipsa magni temporibus ea omnis, nemo velit nostrum, quos, doloremque quod sapiente dolorem fugit nulla ut ad reiciendis commodi iste esse. Dignissimos, rem qui perspiciatis pariatur laborum vero ipsam praesentium tempora in laboriosam! Atque, sapiente iusto? Porro assumenda a itaque commodi, quod quibusdam reprehenderit possimus iusto similique ullam! Voluptates deserunt libero reiciendis non, quasi architecto dolorem, voluptate assumenda error nemo a perferendis nobis dignissimos?",
      created_at: "2023-10-01",
      user: {
        id: "1",
        name: "John Doe",
      },
      commentslength: 10,
    },
    {
      id: "4",
      title: "Blog 4",
      slugs: "blog-4",
      tumbnail:
        "https://images.unsplash.com/photo-1616020453784-a24fa9845b05?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      article:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est adipisci sit vero, distinctio totam dolorum laboriosam earum qui. Perspiciatis quod blanditiis tempora, consectetur tempore asperiores consequuntur nobis labore dignissimos iure distinctio nihil, officia eveniet dolorum eos. Ipsa magni temporibus ea omnis, nemo velit nostrum, quos, doloremque quod sapiente dolorem fugit nulla ut ad reiciendis commodi iste esse. Dignissimos, rem qui perspiciatis pariatur laborum vero ipsam praesentium tempora in laboriosam! Atque, sapiente iusto? Porro assumenda a itaque commodi, quod quibusdam reprehenderit possimus iusto similique ullam! Voluptates deserunt libero reiciendis non, quasi architecto dolorem, voluptate assumenda error nemo a perferendis nobis dignissimos?",
      created_at: "2023-10-01",
      user: {
        id: "1",
        name: "John Doe",
      },
      commentslength: 10,
    },
  ];

  return { blogs };
};
