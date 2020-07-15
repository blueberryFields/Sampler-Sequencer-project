# Build stage

FROM adoptopenjdk/openjdk11 as build
WORKDIR /samplemanager

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

RUN chmod +x ./mvnw
# download the dependency if needed or if the pom file is changed
RUN ./mvnw dependency:go-offline -B

COPY src src

RUN ./mvnw clean package -DskipTests


# Production stage

FROM adoptopenjdk/openjdk11 as production

COPY --from=build /samplemanager/target/*.jar .
RUN apt-get update && apt-get upgrade -y && apt-get install ffmpeg -y
COPY wait-for-mysql.sh wait-for-mysql.sh
RUN chmod +x wait-for-mysql.sh
RUN mkdir ./temp-files
ENTRYPOINT ["./wait-for-mysql.sh", "mysql", "java", "-jar", "samplemanager-0.0.1-SNAPSHOT.jar"]

