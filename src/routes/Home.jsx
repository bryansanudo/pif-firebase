import React, { useEffect, useState } from "react";
import Title from "@/components/Title";
import { useFirestore } from "@/hooks/useFirestore";
import Button from "@/components/Button";
import { auth } from "@/firebase";
import { formValidate } from "@/utils/formValidate";
import FormInput from "@/components/FormInput";
import FormTextArea from "@/components/FormTextArea";
import FormError from "@/components/FormError";
import { erroresFirebase } from "@/utils/erroresFirebase";

import { AiOutlineArrowUp } from "react-icons/ai";

import { useForm } from "react-hook-form";

const Home = () => {
  const { required, patternEmail } = formValidate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setError,
    setValue,
  } = useForm();

  const { data, error, loading, getData, addData, deleteData, updateData } =
    useFirestore();

  const [newOriginId, setNewOriginId] = useState();

  useEffect(() => {
    getData();
  }, []);

  if (loading.getData) return <p>Bievenido a Ingravity Roller...</p>;
  if (error) return <p>{error}</p>;

  const onSubmit = async ({ url }) => {
    try {
      if (newOriginId) {
        await updateData(newOriginId, url);
        setNewOriginId("");
      } else {
        await addData(url);
      }
      resetField("url");
    } catch (error) {
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message });
    }
  };

  const handleClickDelete = async (nanoid) => {
    await deleteData(nanoid);
  };

  const handleClickEdit = (item) => {
    setValue("url", item.origin);
    setNewOriginId(item.nanoid);
  };

  return (
    <>
      <Title text="Usuarios Registrados" />

      <div className="md:max-w-screen-xl mx-auto h-fit grid grid-cols-1  gap-10 justify-center px-6">
        {/*  <div className="col-span-1 h-[500px] flex items-center mx-4">
          <div className="  w-[380px] md:w-[280px]  h-min  md:fixed   ">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="text-center md:text-start"
            >
              <FormTextArea
                label="Publicacion"
                placeholder="Escribe tu mensaje"
                {...register("url", {
                  required,
                  pattern: patternEmail,
                })}
                error={errors.url}
              >
                <FormError error={errors.email} />
              </FormTextArea>

              {newOriginId ? (
                <Button
                  type="submit"
                  text="Editar publicacion"
                  loading={loading.updateData}
                />
              ) : (
                <Button
                  type="submit"
                  text="Publicar"
                  loading={loading.addData}
                />
              )}
            </form>
          </div>
        </div> */}

        <div className=" flex flex-col gap-8  ">
          {data.map((item) => (
            <div
              key={item.nanoid}
              className="p-6 rounded-lg shadow-md shadow-gray-200 flex items-center flex-col w-[300px] mx-auto  "
            >
              {/* <div className="flex justify-end mb-2">
                {auth.currentUser.uid === item.uid && (
                  <Button
                    type="button"
                    text="Eliminar"
                    loading={loading[item.nanoid]}
                    onClick={() => handleClickDelete(item.nanoid)}
                  />
                 
                )}
              </div> */}
              {/* <textarea
                readOnly
                className="mb-3 font-medium text-gray-700 w-full rounded-lg cursor-default focus:border-black focus:ring-black h-32 md:h-10"
              >
                {item.name}
              </textarea> */}

              <p className=" font-bold capitalize text-gray-400 mb-6">
                {item.name}
              </p>
              <img src="/user.png" alt="" className="h-20" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
