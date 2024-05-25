import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit} method="post">
        <div className="flex gap-6 lg:pl-6 lg:pb-4">
          <input
            type="text"
            className="form-control lg:w-[380px]"
            placeholder="Enter new  Category "
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
