//staff from pg-core and some relationships
import {pgTable, text, uuid, integer, boolean, timestamp} from "drizzle-orm/pg-core"
import {relations} from "drizzle-orm"

export const files = pgTable("files", {
    id: uuid("id").defaultRandom().primaryKey(), //give id as uuid ; random def of id

    //basic file/folder information
    name: text("name").notNull(),
    path: text("path").notNull(),
    size: integer("size").notNull(),
    type: text("type").notNull(), //this is MIME type(is this a file or a folder?)

    //storage information
    fileUrl: text("file_url").notNull(), //url to access the file
    thumbnailUrl: text("thumbnail_url"),

    //Ownership (does have a parent or not)
    userId: text("user_id").notNull(),
    parentId: uuid("parend_id"), // parend folder id (null for root items)
    
    //file/folder flags
    isFolder: boolean("is_folder").default(false).notNull(), //everything is actually a file, but if the flag is on this is a folder
    isStarred: boolean("is_starred").default(false).notNull(),
    isTrash: boolean("is_trash").default(false).notNull(),

    //Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})
/*
parend: Each file/folder can have one parent folder
children: Each folder can have many child files/folders
*/

export const filesRelations = relations(files, ({one, many}) => ({
    parent: one(files, {
        fields: [files.parentId],
        references: [files.id]
    }),
    //relationship to child file/folder
    children: many(files)
}))


//type definition
export const File = typeof files.$inferSelect