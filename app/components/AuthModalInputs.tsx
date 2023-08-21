import { AuthInputProps } from "./AuthModal";

export default function AuthModalInputs({props}:{props:AuthInputProps}) {
  return (
    <div>
      {props.isSignIn||
      <div className="my-3 flex justify-between text-sm">
        <input
          type="text"
          className="border rounded p-2 py-3 w-[49%]"
          placeholder="First Name"
          name="firstName"
          onChange={props.handleChange}
          value={props.inputValues.firstName}
        />
        <input
          type="text"
          className="border rounded p-2 py-3 w-[49%]"
          placeholder="Last Name"
          name="lastName"
          onChange={props.handleChange}
          value={props.inputValues.lastName}
        />
      </div>}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="text"
          className="border rounded p-2 py-3 w-full"
          placeholder="Email"
          name="email"
          onChange={props.handleChange}
          value={props.inputValues.email}
        />
      </div>
      {props.isSignIn||
      <div className="my-3 flex justify-between text-sm">
        <input
          type="text"
          className="border rounded p-2 py-3 w-[49%]"
          placeholder="Phone"
          name="phone"
          onChange={props.handleChange}
          value={props.inputValues.phone}
        />
        <input
          type="text"
          className="border rounded p-2 py-3 w-[49%]"
          placeholder="City"
          name="city"
          onChange={props.handleChange}
          value={props.inputValues.city}
        />
      </div>}
      <div className="my-3 flex justify-between text-sm">
        <input
          type="password"
          className="border rounded p-2 py-3 w-full"
          placeholder="Password"
          name="password"
          onChange={props.handleChange}
          value={props.inputValues.password}
        />
      </div>
    </div>
  );
}
