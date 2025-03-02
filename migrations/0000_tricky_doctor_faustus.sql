CREATE TYPE "public"."role" AS ENUM('ADMIN', 'USER');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('BOOKED', 'NOT_BOOKED');--> statement-breakpoint
CREATE TABLE "todo" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" text NOT NULL,
	"role" "role" DEFAULT 'USER',
	"status" "status" DEFAULT 'NOT_BOOKED',
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "todo_id_unique" UNIQUE("id"),
	CONSTRAINT "todo_email_unique" UNIQUE("email")
);
