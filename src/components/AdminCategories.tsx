import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Table } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";

import { AppDispatch } from "@/tookit/store";
import {
  CreateCategory,
  UpdateCategory,
  deleteCategory,
  fetchCategories
} from "@/tookit/slices/CategorySlice";
import AdminSidebar from "@/components/AdminSidebar";
import { Category, UpdateFormData } from "@/types";
import useCategoriesState from "@/hooks/useCategoriesState";
import { toastError } from "./Notifications "

export const AdminCategories = () => {
  const { categories, isLoading, error } = useCategoriesState();
  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<UpdateFormData>(); // Updated to use UpdateFormData

  const [isEdit, setIsEdit] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategories());
    }
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<UpdateFormData> = async (data) => { // Updated to use UpdateFormData
    try {
      if (isEdit) {
        if (selectedCategoryId !== null) {
          await dispatch(
            UpdateCategory({ updateCategoryData: data, categoryId: selectedCategoryId })
          );
          setIsEdit(false);
        } else {
          toastError("selectedCategoryId is null");
        }
      } else {
        await dispatch(CreateCategory(data));
      }
      reset();
    } catch (error) {
      toastError("Create category failed");
    }
  };

  const handleEdit = async (category: Category) => {
    setIsEdit(true);
    setValue("categoryName", category.categoryName);
    setSelectedCategoryId(category.categoryId);
    setValue("categoryDescription", category.categoryDescription);
  };

  const handleDelete = async (categoryId: number) => {
    try {
      const response = await dispatch(deleteCategory(categoryId));
      console.log(response);
    } catch (error) {
      toastError("Delete category failed");
    }
  };

  const truncateDescription = (categoryDescription: string, maxLength = 50) => {
    if (categoryDescription.length <= maxLength) {
      return categoryDescription;
    } else {
      return `${categoryDescription.slice(0, maxLength)}...`;
    }
  };

  return (
    <div className="wrap">
      <AdminSidebar />
      {isLoading && (
        <div className="loading-spinner-container">
          <div className="loading-spinner">
            <FontAwesomeIcon icon={faSpinner} spin style={{ color: "#889785", fontSize: "3em" }} />
          </div>
        </div>
      )}
      {error && <p>error{error}</p>}

      {!isLoading && !error && (
        <div className="dashboardAdmin__container">
          <div className="form__container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form__field">
                <p>{isEdit ? "Edit Category" : "Create Category"}</p>
                <input
                  type="text"
                  {...register("categoryName", {
                    required: "Category Name is required",
                    maxLength: {
                      value: 30,
                      message: "Category Name must be less than 30 characters"
                    }
                  })}
                  placeholder="Category Name"
                />
                {errors.categoryName && (
                  <span className="error-message">{errors.categoryName.message}</span>
                )}
              </div>

              <div className="form__field">
                <input
                  type="text"
                  {...register("categoryDescription", {
                    required: "Description is required",
                    maxLength: {
                      value: 30,
                      message: "Description must be less than 30 characters"
                    }
                  })}
                  placeholder="Category Description"
                />
                {errors.categoryDescription && (
                  <span className="error-message">{errors.categoryDescription.message}</span>
                )}
              </div>
              <button type="submit">{isEdit ? "Update" : "Create"}</button>
            </form>
          </div>

          <div style={{ overflowX: "auto" }}>
            <Table className="table__categories">
              <Table.Head>
                <Table.HeadCell className="table-head-cell">Name</Table.HeadCell>
                <Table.HeadCell className="table-head-cell">Description</Table.HeadCell>
                <Table.HeadCell className="table-head-cell">Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {categories.map((category) => (
                  <Table.Row className="table-row" key={category.categoryId}>
                    <Table.Cell className="table-cell">{category.categoryName}</Table.Cell>
                    <Table.Cell className="table-cell">
                      {truncateDescription(category.categoryDescription)}
                    </Table.Cell>
                    <Table.Cell className="table-cell">
                      <div className="button__container">
                        <button
                          className="button__edit"
                          onClick={() => {
                            handleEdit(category);
                          }}
                        >
                          <MdEditSquare size={13} />
                        </button>
                        <button
                          className="button__delete"
                          onClick={() => handleDelete(category.categoryId)}
                        >
                          <MdDeleteForever size={13} />
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};
