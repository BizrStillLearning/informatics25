package model

import (
	"time"
)

type User struct {
	ID        uint       `gorm:"primaryKey;autoIncrement" json:"id"`
	Username  string     `gorm:"type:varchar(50);unique;not null" json:"username"`
	Password  string     `gorm:"type:varchar(255);not null" json:"-"`
	Role      string     `gorm:"type:enum('admin','mahasiswa');default:'mahasiswa';not null" json:"role"`
	CreatedAt time.Time  `gorm:"default:CURRENT_TIMESTAMP" json:"created_at"`
	Mahasiswa *Mahasiswa `gorm:"foreignKey:UserID" json:"profile,omitempty"`
}

type Mahasiswa struct {
	ID           uint      `gorm:"primaryKey" json:"id"`
	UserID       uint      `gorm:"column:user_id" json:"user_id"`
	NIM          string    `gorm:"column:nim;unique" json:"nim"`
	FullName     string    `gorm:"column:full_name" json:"full_name"`
	Slug         string    `gorm:"column:slug;unique" json:"slug"`
	Avatar       string    `gorm:"column:avatar;default:default.jpg" json:"avatar"`
	Domicile     string    `gorm:"column:domicile" json:"domicile"`
	SchoolOrigin string    `gorm:"column:school_origin" json:"school_origin"`
	Hobby        string    `gorm:"column:hobby" json:"hobby"`
	Quote        string    `gorm:"column:quote" json:"quote"`
	Goal         string    `gorm:"column:goal" son:"goal"`
	Instagram    string    `gorm:"column:instagram" json:"instagram"`
	Github       string    `gorm:"column:github" json:"github"`
	Linkedin     string    `gorm:"column:linkedin" json:"linkedin"`
	CreatedAt    time.Time `gorm:"column:created_at" json:"created_at"`
	UpdatedAt    time.Time `gorm:"column:updated_at" json:"updated_at"`
}

func (Mahasiswa) TableName() string {
	return "mahasiswa"
}
