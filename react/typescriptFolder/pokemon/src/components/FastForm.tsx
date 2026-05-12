import { useForm } from "react-hook-form";
import { UserSchema } from "../schema/UserSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export const FastForm = () => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit = (data: unknown) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} type="email"/>
      <button type="submit">Enviar</button>
    </form>
  );
};