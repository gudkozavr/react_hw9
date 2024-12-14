import React from "react";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";

export default function DynamicForm() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onChange" });

  const firstFieldValue = watch("firstField");

  function onSubmit(data) {
    console.log(data.firstField);
    console.log(errors);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form_container}>
      <label>
        First field:
        <input
          type="text"
          {...register("firstField", {
            required: "Input required to be field",
            minLength: {
              value: 5,
              message: "min symbols is 5",
            },
          })}
        />
      </label>
      {firstFieldValue && !errors.firstField && (
        <label>
          Second field
          <input
            type="text"
            {...register("secondField", { required: true })}
          ></input>
        </label>
      )}
      {errors.firstField?.type === "minLength" && (
        <p>{errors.firstField.message}</p>
      )}
      <input type="submit" value="submit" />
    </form>
  );
}
