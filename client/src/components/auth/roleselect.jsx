function RoleSelect({ value, onChange }) {
  return (
    <div className="form-group">
      <label>Role</label>
      <select
        name="role"
        value={value}
        onChange={onChange}
        required
      >
        <option value="">Select role</option>
        <option value="buyer">Buyer</option>
        <option value="owner">Owner</option>
        {/* <option value="agent">Agent</option> */}
        <option value="admin">Admin</option>
      </select>
    </div>
  );
}

export default RoleSelect;
