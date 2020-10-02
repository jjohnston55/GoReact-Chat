FROM golang:1.15.2-alpine3.12
ENV GO111MODULE=on
RUN mkdir /app
ADD . /app/
WORKDIR /app
RUN go mod download
RUN go build .
EXPOSE 8080
CMD ["/app/backend"]