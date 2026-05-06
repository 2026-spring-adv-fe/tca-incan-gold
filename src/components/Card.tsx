import type {ReactNode} from "react";

const Card = ({children}:{ children: ReactNode}) => {
    return (
        <section className="card bg-base-100 border border-base-300 shadow-md my-2">
            <div className="card-body p-6">
                <div className="flex flex-col gap-4">
                    {children}
                </div>
            </div>
        </section>
    );
}

export default Card;
