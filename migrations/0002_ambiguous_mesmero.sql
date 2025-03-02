CREATE TABLE "bookings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date" date NOT NULL,
	"time_slot" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "bookings_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "todo" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "todo_id_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "todo_email_unique";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_id_unique" UNIQUE("id");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");