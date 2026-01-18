
import { router, adminProcedure } from '../../trpc';
import { db } from '../../db';



export const userRouter = router({

    //   Get All Users (Admin Only) 
    getAllUser: adminProcedure.query(async () => {
        return await db.user.findMany({
            select: { id: true, name: true, email: true, role: true, createdAt: true }
        });
    }),


});