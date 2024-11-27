import ResetPasswordForm from "../components/ResetPasswordForm";

const ResetPassword = ({ params }: { params: { token: string } }) => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-abu text-slate-100">
      <ResetPasswordForm token={params.token} />
    </div>
  );
};

export default ResetPassword;
