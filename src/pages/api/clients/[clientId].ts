import type { APIRoute } from 'astro';
import { Clients, db, eq } from 'astro:db';
export const prerender = false;


export const GET: APIRoute = async ({ params, request} ) => {

    const clientId = params.clientId;

    const body = {
        method: 'GET',
        clientId: clientId
    }
    
    return new Response(
        JSON.stringify(body), { 
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );    
}

export const PATCH: APIRoute = async ({ params, request} ) => {
    
    const clientId = params.clientId ?? 0;

    try{

        const { ...body } = await request.json();

        // Update xxx=yyy from Table
        const updatedClient = await db.update(Clients)
            .set(body)
            .where( eq(Clients.id, +clientId )) // el + es para convertir el string a number
            .returning();

        return new Response ( JSON.stringify(updatedClient),
            {
                status: 201,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }catch ( error ){
        console.log(error);
        return new Response ( JSON.stringify({ msg: 'No hay body!' }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export const DELETE: APIRoute = async ({ params, request} ) => {
    const clientId = params.clientId ?? 0;

    const { rowsAffected } = await db.delete(Clients).where( eq(Clients.id, +clientId));

    if( rowsAffected > 0 ){
        return new Response(
            JSON.stringify({
                msg: 'Deleted!'
            }),
            { 
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    return new Response(
        JSON.stringify({
            msg: 'Nada que borrar, el registro no existe'
        }),
        { 
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
}