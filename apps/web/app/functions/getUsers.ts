export type User = {
  id: number;
  full_name: string;
  email: string;
  password: string;
  short_description: string;
  description: string;
  job: string;
  city: string;
  image: string;
Magazine : Magazine[]
};
export type Magazine = {
    auther_id : number
    category_id : number
    magazine_name: string;
    description: string;
    publish_date: string;
    duration: string;
    image: string;
    short_description:string;
category : {
    id:number,
    category_name:string
}
}

export type UserType = {
    success:boolean;
    message:string;
    data:User[];
}

export async function getUsers() {
  const res = await fetch(
    "http://localhost:3000/api/user/user-list"
  );


  if (!res.ok) {
    throw new Error("Failed to fetch article data");
  }

  return res.json();
}
